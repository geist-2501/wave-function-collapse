import Two from "two.js";
import type { RawImage } from "$lib/RawImage";

export default class CanvasRenderer {
    private readonly two: Two;

    private readonly image: RawImage;
    private readonly ppi: number;

    constructor(root: HTMLElement, image: RawImage, ppi: number) {
        this.two = new Two({}).appendTo(root);
        this.ppi = ppi;

        this.image = image;
    }

    draw() {
        this.two.clear();

        const image = this.image;
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                const ppi = this.ppi;
                const offset = ppi / 2;
                const rect = this.two.makeRectangle(
                    offset + x * ppi,
                    offset + y * ppi,
                    ppi,
                    ppi,
                );
                rect.fill = image.get(x, y).toHex();
            }
        }

        this.two.update();
    }
}
