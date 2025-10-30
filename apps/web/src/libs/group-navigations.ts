import { Navigation } from "@repo/database";

export function groupNavigationsByCategory(
    navigations: Navigation[]
): Record<string, Navigation[]> {
    return navigations.reduce(
        (acc, nav) => {
            if (!acc[nav.category]) {
                acc[nav.category] = [];
            }
            acc[nav.category]?.push(nav);
            return acc;
        },
        {} as Record<string, Navigation[]>
    );
}
