import type { Hex, RGB } from "$lib/RGB";
import { RGBHelper } from "$lib/RGB";
import { Matrix } from "$lib/Matrix";

export class ImageLoader {
    static loadImage(source: string): Matrix<Hex> {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (context === null) {
            throw new Error("Could not create 2d context to load image");
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

        return new Matrix<Hex>(alignedData, img.width, img.height);
    }
}
