import type { Hex } from "$lib/RGB";
import _ from "lodash";
import type { RawImage } from "$lib/RawImage";
import { Matrix } from "$lib/Matrix";
import type { Coord } from "$lib/Coord";

export type Pattern = Hex[];

export default class WFC {
    private readonly n = 3;
    private readonly image: RawImage;

    public colours: Hex[] = [];
    public patterns: Pattern[] = [];
    public entropy: Matrix<Hex | number>;

    constructor(image: RawImage) {
        this.image = image;

        this.colours = this.countColours();
        this.patterns = this.countPatterns();

        // initialise the entropy array to equal the number of patterns.
        this.entropy = Matrix.initialise<Hex | number>(this.patterns.length, image.width, image.height);
    }

    step() {
        // select tile with the lowest entropy.
        // randomly choose the center colour of a compatible pattern (setting entropy to 0).
        // update the entropy values of neighbouring cells. Wrapping doesn't matter.
        // repeat until all entropy is equal to 0.

        // pattern compatibility just means it fits with collapsed neighbour cells.
    }

    getEntropy(coord: Coord): number {
        let entropy = 0;
        const constraints: (Hex | null)[] = [];
        this.entropy.iterateN(this.n, coord, (c, cell) => {
            if (typeof(cell) === 'string') {
                constraints.push(cell);
            } else {
                constraints.push(null);
            }
        });

        for (const pattern of this.patterns) {
            let patternFits = true;
            pattern.forEach((cell, idx) => {
                const constraint = constraints[idx];
                if (constraint) {
                    patternFits &&= cell === constraint;
                }
            });

            if (patternFits) {
                entropy += 1;
            }
        }

        return entropy;
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
        const pattern: Pattern = [];
        this.image.matrix.iterateN(this.n, {x, y}, (coord, cell) => {
            pattern.push(cell);
        });

        return pattern;
    }
}
