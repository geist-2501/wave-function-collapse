export class RGB {
    constructor(
        private r: number,
        private g: number,
        private b: number,
    ) {}

    toHex(): string {
        const hexR = RGB.pad(RGB.decToHex(this.r));
        const hexG = RGB.pad(RGB.decToHex(this.b));
        const hexB = RGB.pad(RGB.decToHex(this.g));

        return `#${hexR}${hexB}${hexG}`;
    }

    private static decToHex(decimal: number): string {
        return decimal.toString(16);
    }

    private static pad(str: string): string {
        return str.padStart(2, "0");
    }
}
