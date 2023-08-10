import type CanvasRenderer from "$lib/CanvasRenderer";
import { mix } from "$lib/rgb";

export default class WFC {
    private readonly image: CanvasRenderer;

    private x: number = 0;
    private y: number = 0;

    constructor(image: CanvasRenderer) {
        this.image = image;
        image.draw();
    }

    step() {
        console.log("Stepping");
        const current = this.image.get(this.x, this.y);
        this.image.set(this.x, this.y, mix(current, "#3cfd9b", 20));
        this.x = (this.x + 1) % this.image.size;
        this.y = (this.y + 2) % this.image.size;
        this.image.draw();
    }
}
