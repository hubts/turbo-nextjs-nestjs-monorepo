import { Clear, Unit } from "@repo/database";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ClearRecordStyle } from "./ClearRecordList.Style";
import ClearService from "@/src/api/services/clear.service";
import UnitService from "@/src/api/services/unit.service";
import { ClearRecord } from "./ClearRecord";
import { UserAndBadge } from "@repo/shared";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";

// 디바운스 훅
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// 스켈레톤 로딩 컴포넌트
function SkeletonLoader() {
    return (
        <div css={ClearRecordStyle.skeletonContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} css={ClearRecordStyle.skeletonItem} />
            ))}
        </div>
    );
}

export default function ClearRecordList(input: { user: UserAndBadge }) {
    /**
     * 쿼리 추출
     */
    const router = useRouter();
    const { page, search } = router.query;

    const { user } = input;
    const [clears, setClears] = useState<Clear[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState(
        search ? (search as string) : ""
    );
    const [currentPage, setCurrentPage] = useState(
        page ? parseInt(page as string) : 0
    );
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    // 디바운스된 검색어
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 유닛 정보 로드 (한 번만)
    useEffect(() => {
        UnitService.Instance.getUnits().then(setUnits);
    }, []);

    // 클리어 목록 로드 (메모이제이션된 함수)
    const loadClears = useCallback(async () => {
        setLoading(true);
        try {
            const result = await ClearService.Instance.getClears({
                userId: user.userId,
                skip: currentPage * itemsPerPage,
                take: itemsPerPage,
                search: debouncedSearchTerm || undefined,
            });

            // API에서 반환된 total과 list를 활용
            setClears(result.list);
            setTotalCount(result.total);
        } catch (error) {
            console.error("클리어 목록을 불러오는데 실패했습니다:", error);
        } finally {
            setLoading(false);
        }
    }, [user.userId, currentPage, debouncedSearchTerm]);

    // 검색어나 페이지가 변경될 때만 로드
    useEffect(() => {
        loadClears();
    }, [loadClears]);

    // 검색어가 변경되면 첫 페이지로 이동
    useEffect(() => {
        if (!router.isReady) return;

        // URL 쿼리 업데이트
        const query = { ...router.query };
        query.page = "0"; // 첫 페이지로 이동

        if (debouncedSearchTerm) {
            query.search = debouncedSearchTerm;
        } else {
            delete query.search;
        }

        router.push({ pathname: router.pathname, query }, undefined, {
            shallow: true,
            scroll: false,
        });
    }, [debouncedSearchTerm, router.isReady]);

    // router.query에서 상태 동기화
    useEffect(() => {
        const queryPage = page ? parseInt(page as string) : 0;
        const querySearch = search ? (search as string) : "";

        setCurrentPage(queryPage);
        setSearchTerm(querySearch);
    }, [page, search]);

    // user가 변경되면 첫 페이지로 리셋
    useEffect(() => {
        if (router.isReady) {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, page: "0" },
                },
                undefined,
                {
                    shallow: true,
                    scroll: false,
                }
            );
        }
    }, [user.userId, router.isReady]);

    // 검색 처리
    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        // 디바운스로 인해 자동으로 처리됨
    }, []);

    // 페이지 변경
    const handlePageChange = useCallback(
        (newPage: number) => {
            // URL 쿼리 업데이트 (상태는 URL 변경을 감지해서 자동 업데이트)
            const query = { ...router.query };
            query.page = newPage.toString();

            router.push({ pathname: router.pathname, query }, undefined, {
                shallow: true,
                scroll: false,
            });
        },
        [router]
    );

    // 메모이제이션된 계산값들
    const totalPages = useMemo(
        () => Math.ceil(totalCount / itemsPerPage),
        [totalCount, itemsPerPage]
    );
    const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
    const isLastPage = useMemo(
        () => currentPage >= totalPages - 1,
        [currentPage, totalPages]
    );

    if (!units.length) {
        return (
            <p
                style={{
                    textAlign: "center",
                    marginTop: 100,
                    color: "lightgray",
                }}
            >
                유닛 정보를 불러오는 데에 실패하였습니다.
            </p>
        );
    }

    return (
        <div css={ClearRecordStyle.container}>
            {/* 검색 및 페이지네이션 헤더 */}
            <div css={ClearRecordStyle.header}>
                <form css={ClearRecordStyle.searchForm} onSubmit={handleSearch}>
                    <div css={ClearRecordStyle.searchContainer}>
                        <FaSearch css={ClearRecordStyle.searchIcon} />
                        <input
                            type="text"
                            placeholder="유닛 이름으로 검색..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            css={ClearRecordStyle.searchInput}
                        />
                    </div>
                    <button type="submit" css={ClearRecordStyle.searchButton}>
                        검색
                    </button>
                </form>

                {/* 페이지네이션 */}
                <div css={ClearRecordStyle.paginationContainer}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={isFirstPage}
                        css={ClearRecordStyle.paginationButton}
                    >
                        <FaChevronLeft />
                    </button>
                    <span css={ClearRecordStyle.pageInfo}>
                        {currentPage + 1} / {Math.max(1, totalPages)}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={isLastPage}
                        css={ClearRecordStyle.paginationButton}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            {/* 클리어 목록 */}
            <div css={ClearRecordStyle.listDiv}>
                {loading ? (
                    <SkeletonLoader />
                ) : clears.length === 0 ? (
                    <p css={ClearRecordStyle.emptyText}>
                        {debouncedSearchTerm
                            ? "검색 결과가 없습니다."
                            : "클리어 기록이 존재하지 않습니다."}
                    </p>
                ) : (
                    <div css={ClearRecordStyle.fadeIn}>
                        {clears.map((clear, index) => (
                            <ClearRecord
                                key={`${clear.id}-${index}`}
                                user={user}
                                units={units}
                                clear={clear}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
