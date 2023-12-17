import Two from "two.js";
import type { Matrix } from "$lib/Matrix";
import type { Hex } from "./RGB";

export default class CanvasRenderer {
    private readonly two: Two;
    private readonly ppi: number;

    constructor(root: HTMLElement, ppi: number) {
        this.two = new Two({}).appendTo(root);
        this.ppi = ppi;
    }

    draw(image: Matrix<Hex>) {
        this.two.clear();

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
                rect.fill = image.get(x, y);
            }
        }

        this.two.update();
    }
}
