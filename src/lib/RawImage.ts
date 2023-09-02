import { RGB } from "$lib/RGB";

export class RawImage {
    constructor(
        private readonly data: RGB[][],
        public readonly width: number,
        public readonly height: number,
    ) {}

    get(x: number, y: number): RGB {
        return this.data[y][x];
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
        const alignedData: RGB[][] = [];
        for (let y = 0; y < img.height; y++) {
            alignedData[y] = [];
            for (let x = 0; x < img.width; x++) {
                const offset = (y * img.width + x) * 4;
                const r = rawData.data[offset];
                const g = rawData.data[offset + 1];
                const b = rawData.data[offset + 2];
                alignedData[y][x] = new RGB(r, g, b);
            }
        }

        return new RawImage(alignedData, img.width, img.height);
    }
}
