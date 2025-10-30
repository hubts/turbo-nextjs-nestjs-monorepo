import { existsSync, mkdirSync, renameSync } from "fs";
import { ExpectedErrorException } from "src/common/error/expected-error.exception";
import { getMulterOptions } from "src/config/internal/multer.config.service";

export function moveFilePath(srcPath: string, dstPath: string): string {
    const originalname = srcPath.split("/").pop();
    const destDir = `${getMulterOptions().dest}/clear/${dstPath}`;
    const destPath = `${destDir}/${originalname}`;
    try {
        if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true });
        }
        renameSync(srcPath, destPath);
        return destPath;
    } catch (error) {
        throw new ExpectedErrorException(
            "SERVICE_UNAVAILABLE",
            {
                case: "파일 이동에 실패하였음",
                srcPath,
                destPath,
                error: `${error}`,
            },
            `${error}`
        );
    }
}
