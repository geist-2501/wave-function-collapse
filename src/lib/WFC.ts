import type CanvasRenderer from "$lib/CanvasRenderer";
import type { RGB } from "$lib/RGB";
import _, { floor } from "lodash";
import type { RawImage } from "$lib/RawImage";

export type Pattern = RGB[][];

export default class WFC {
    private readonly n = 3;
    private readonly renderer: CanvasRenderer;
    private readonly image: RawImage;

    public colours: RGB[] = [];
    public patterns: Pattern[] = [];

    constructor(renderer: CanvasRenderer) {
        this.renderer = renderer;
        this.image = renderer.image;

        // Count colours.
        for (const pixel of renderer.image.getAllData()) {
            if (!_.some(this.colours, pixel)) {
                this.colours.push(pixel);
            }
        }

        // Count patterns.
        for (let x = 0; x < this.image.width; x++) {
            for (let y = 0; y < this.image.height; y++) {
                const pattern = this.getPattern(x, y);
                console.log(pattern);
                if (!_.some(this.patterns, pattern)) {
                    this.patterns.push(pattern);
                }
            }
        }

        console.log(`got ${this.patterns.length} unique patterns`);
        console.log(this.image.width * this.image.height);

        // Wrap when sampling

        renderer.draw();
    }

    step() {
        // select tile with the lowest entropy.
        // collapse to a colour.
    }

    private getPattern(x: number, y: number): Pattern {
        const pattern: Pattern = Array(this.n);
        const offset = floor(this.n / 2);
        for (let dy = 0; dy < this.n; dy++) {
            pattern[dy] = Array(this.n);
            for (let dx = 0; dx < this.n; dx++) {
                pattern[dy][dx] = this.image.get(
                    x + dx - offset,
                    y + dy - offset,
                    true,
                );
            }
        }

        return pattern;
    }
}
