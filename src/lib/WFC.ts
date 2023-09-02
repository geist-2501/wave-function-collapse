import type CanvasRenderer from "$lib/CanvasRenderer";

export default class WFC {
    private readonly image: CanvasRenderer;

    constructor(image: CanvasRenderer) {
        this.image = image;
        image.draw();
    }

    step() {}
}
