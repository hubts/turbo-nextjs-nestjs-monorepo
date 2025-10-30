export class NumberCommaUtil {
    static normal(num: number): string {
        const regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ",");
    }

    static asMan(num: number): string {
        const num10Thousand = parseInt((num / 10000).toFixed(0));
        return this.normal(num10Thousand);
    }

    static asUck(num: number): string {
        const num100million = parseInt((num / 100000000).toFixed(0));
        return this.normal(num100million);
    }
}
