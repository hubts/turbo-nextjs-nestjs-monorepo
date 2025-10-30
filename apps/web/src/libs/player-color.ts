export function getPlayerColor(index: number): string {
    const PLAYER_COLORS = [
        "red",
        "blue",
        "purple",
        "gold",
        "green",
        "orange",
        "cyan",
        "magenta",
        "lime",
        "pink",
        "yellow",
        "brown",
        "teal",
        "indigo",
        "violet",
        "gray",
    ];
    const realIndex = index % PLAYER_COLORS.length;
    return PLAYER_COLORS[realIndex]!;
}
