export type RGB = {
    r: number;
    g: number;
    b: number;
};

export class RGBHelper {
    static toHex(rgb: RGB): string {
        const { r, g, b } = rgb;
        const hexR = RGBHelper.pad(RGBHelper.decToHex(r));
        const hexG = RGBHelper.pad(RGBHelper.decToHex(b));
        const hexB = RGBHelper.pad(RGBHelper.decToHex(g));

        return `#${hexR}${hexB}${hexG}`;
    }

    private static decToHex(decimal: number): string {
        return decimal.toString(16);
    }

    private static pad(str: string): string {
        return str.padStart(2, "0");
    }
}
