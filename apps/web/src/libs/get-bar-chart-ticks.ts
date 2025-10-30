import { max } from "@repo/shared";

function calcMaxAndTicks(maxValue: number): [number, number] {
    if (maxValue < 10) {
        return [10, 2];
    } else if (maxValue < 25) {
        return [25, 5];
    } else if (maxValue < 50) {
        return [50, 10];
    } else if (maxValue < 75) {
        return [75, 15];
    } else if (maxValue < 100) {
        return [100, 20];
    } else if (maxValue < 125) {
        return [125, 25];
    } else if (maxValue < 150) {
        return [150, 30];
    } else if (maxValue < 250) {
        return [250, 50];
    } else if (maxValue < 300) {
        return [300, 60];
    } else if (maxValue < 500) {
        return [500, 100];
    } else {
        return [1000, 200];
    }
}

export function getBarChartTicks(data: number[]): {
    maxValue: number;
    ticks: number[];
} {
    const dataMaxValue = max(data) ?? 10;
    const [maxValue, tickCut] = calcMaxAndTicks(dataMaxValue);
    const ticks = Array.from(
        { length: maxValue / tickCut + 1 },
        (_, i) => i * tickCut
    );
    return {
        maxValue,
        ticks,
    };
}
