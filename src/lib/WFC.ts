import type { Hex } from "$lib/RGB";
import _, { floor } from "lodash";
import type { RawImage } from "$lib/RawImage";

export type Pattern = Hex[];

export default class WFC {
    private readonly n = 3;
    private readonly image: RawImage;

    public colours: Hex[] = [];
    public patterns: Pattern[] = [];

    constructor(image: RawImage) {
        this.image = image;

        this.colours = this.countColours();
        this.patterns = this.countPatterns();

        // Wrap when sampling
    }

    step() {
        // select tile with the lowest entropy.
        // collapse to a colour.
    }

    countColours(): Hex[] {
        const colours: Hex[] = [];
        for (const pixel of this.image.getAllData()) {
            if (!colours.some((it) => it === pixel)) {
                colours.push(pixel);
            }
        }

        return colours;
    }

    countPatterns(): Pattern[] {
        const patterns: Pattern[] = [];
        for (let x = 0; x < this.image.width; x++) {
            for (let y = 0; y < this.image.height; y++) {
                const pattern = this.getPattern(x, y);
                if (!patterns.some((it) => _.isEqual(it, pattern))) {
                    patterns.push(pattern);
                }
            }
        }

        return patterns;
    }

    getPattern(x: number, y: number): Pattern {
        const max = this.n * this.n;
        const pattern: Pattern = Array(max);
        const offset = floor(this.n / 2);
        for (let i = 0; i < max; i++) {
            const dx = i % this.n;
            const dy = floor(i / this.n);
            pattern[i] = this.image.get(x + dx - offset, y + dy - offset, true);
        }

        return pattern;
    }
}
