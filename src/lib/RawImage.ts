import type { Hex, RGB } from "$lib/RGB";
import { RGBHelper } from "$lib/RGB";
import { Matrix } from "$lib/Matrix";

export class RawImage {
    readonly matrix: Matrix<Hex>;

    get width(): number {
        return this.matrix.width;
    }

    get height(): number {
        return this.matrix.height;
    }

    constructor(data: Hex[][], width: number, height: number) {
        this.matrix = new Matrix<Hex>(data, width, height);
    }

    get(x: number, y: number, wrap = false): Hex {
        return this.matrix.get(x, y, wrap);
    }

    static loadImage(source: string): RawImage | null {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context === null) {
            return null;
        }
        const img = document.getElementById(source) as HTMLImageElement;
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const rawData = context.getImageData(0, 0, img.width, img.height);
        const alignedData: Hex[][] = [];
        for (let y = 0; y < img.height; y++) {
            alignedData[y] = [];
            for (let x = 0; x < img.width; x++) {
                const offset = (y * img.width + x) * 4;
                const r = rawData.data[offset];
                const g = rawData.data[offset + 1];
                const b = rawData.data[offset + 2];
                const rgb: RGB = { r, g, b };
                alignedData[y][x] = RGBHelper.toHex(rgb);
            }
        }

        return new RawImage(alignedData, img.width, img.height);
    }

    getAllData(): Hex[] {
        let all: Hex[] = [];
        for (const row of this.matrix.data) {
            all = all.concat(row);
        }

        return all;
    }
}
