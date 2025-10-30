export function getUnitImageSrc(
    type: "unit" | "unitFull",
    name: string,
    grade?: string
) {
    switch (type) {
        case "unit": {
            return `uploads/asset/unit/icon/${grade}/${name.replaceAll(" ", "_")}.png`;
        }
        case "unitFull": {
            return `uploads/asset/unit/img/${grade}/${name.replaceAll(" ", "_")}.webp`;
        }
    }
}

export function getNavigationImageSrc(category: string, name: string) {
    return `uploads/asset/navigation/${category}_${name}.png`;
}
