export class RawImage {
    constructor(
        private readonly data: number[][][],
        private readonly width: number,
        private readonly height: number,
    ) {}

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
        const alignedData: number[][][] = [];
        for (let y = 0; y < img.height; y++) {
            alignedData[y] = [];
            for (let x = 0; x < img.width; x++) {
                const offset = (y * img.width + x) * 4;
                alignedData[y][x] = [];
                alignedData[y][x][0] = rawData.data[offset];
                alignedData[y][x][1] = rawData.data[offset + 1];
                alignedData[y][x][2] = rawData.data[offset + 2];
                alignedData[y][x][3] = rawData.data[offset + 3];
            }
        }

        return new RawImage(alignedData, img.width, img.height);
    }
}
