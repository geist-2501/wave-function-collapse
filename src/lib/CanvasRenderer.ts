import Two from "two.js";

export default class CanvasRenderer {
    private readonly two: Two;

    private image: string[][];
    public readonly size: number;
    private readonly ppi: number;

    constructor(root: HTMLElement, size: number, ppi: number) {
        this.two = new Two({}).appendTo(root);
        this.size = size;
        this.ppi = ppi;

        const image: string[][] = [];
        for (let y = 0; y < size; y++) {
            image[y] = [];
            for (let x = 0; x < size; x++) {
                image[y][x] = "#FF8000";
            }
        }

        this.image = image;
    }

    draw() {
        this.two.clear();

        const image = this.image;
        const size = this.size;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const ppi = this.ppi;
                const offset = ppi / 2;
                const rect = this.two.makeRectangle(
                    offset + x * ppi,
                    offset + y * ppi,
                    ppi,
                    ppi,
                );
                rect.fill = image[y][x];
            }
        }

        this.two.update();
    }

    set(x: number, y: number, content: string) {
        this.image[y][x] = content;
    }

    get(x: number, y: number) {
        return this.image[y][x];
    }
}
