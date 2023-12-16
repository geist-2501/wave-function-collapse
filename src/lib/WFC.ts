import type CanvasRenderer from "$lib/CanvasRenderer";
import type { Hex } from "$lib/RGB";
import _, { floor } from "lodash";
import type { RawImage } from "$lib/RawImage";

export type Pattern = Hex[];

export default class WFC {
    private readonly n = 3;
    private readonly renderer: CanvasRenderer;
    private readonly image: RawImage;

    public colours: Hex[] = [];
    public patterns: Pattern[] = [];

    constructor(renderer: CanvasRenderer) {
        this.renderer = renderer;
        this.image = renderer.image;

        this.colours = WFC.countColours(this.image);

        // Count patterns.
        for (let x = 0; x < this.image.width; x++) {
            for (let y = 0; y < this.image.height; y++) {
                const pattern = this.getPattern(x, y);
                if (!this.patterns.some((it) => _.isEqual(it, pattern))) {
                    this.patterns.push(pattern);
                }
            }
        }

        // Wrap when sampling

        renderer.draw();
    }

    step() {
        // select tile with the lowest entropy.
        // collapse to a colour.
    }

    static countColours(image: RawImage): Hex[] {
        const colours: Hex[] = [];
        for (const pixel of image.getAllData()) {
            if (!colours.some((it) => it === pixel)) {
                colours.push(pixel);
            }
        }

        return colours;
    }

    private getPattern(x: number, y: number): Pattern {
        const max = this.n * this.n;
        const pattern: Pattern = Array(max);
        const offset = floor(this.n / 2);
        for (let i = 0; i < max; i++) {
            const dy = i % this.n;
            const dx = floor(i / this.n);
            pattern[i] = this.image.get(x + dx - offset, y + dy - offset, true);
        }

        return pattern;
    }
}
