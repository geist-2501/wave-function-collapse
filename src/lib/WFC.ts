import type { Hex } from "$lib/RGB";
import _, { random } from "lodash";
import { Matrix } from "$lib/Matrix";
import type { Coord } from "$lib/Coord";

export type Pattern = Hex[];

export default class WFC {
    private readonly n = 3;
    private readonly image: Matrix<Hex>;
    private readonly baseEntropy: number;
    private readonly maxEntropy: number;

    public patterns: Pattern[] = [];
    public entropy: Matrix<Hex | number>;

    constructor(image: Matrix<Hex>) {
        this.image = image;

        this.patterns = this.countPatterns();

        this.baseEntropy = this.patterns.length;
        this.maxEntropy = this.baseEntropy + 1;
        this.entropy = Matrix.initialise<Hex | number>(
            this.baseEntropy,
            image.width,
            image.height,
        );
    }

    step() {
        if (this.entropy.all((cell) => typeof cell === "string")) {
            console.log("No more cells to collapse");
            return;
        }

        // select tile with the lowest entropy.
        const nextCoords = this.entropy.min((cell) => {
            if (typeof cell === "number") {
                return cell;
            } else {
                return this.maxEntropy;
            }
        });
        const nextCoord = nextCoords[random(nextCoords.length - 1)];

        // randomly choose the center colour of a compatible pattern.
        const patterns = this.getCompatiblePatterns(nextCoord);
        if (patterns.length === 0) {
            console.log("No more matching patterns");
            return;
        }

        const selectedPattern = patterns[random(patterns.length - 1)];
        const centerColour = selectedPattern[Math.floor((this.n * this.n) / 2)];

        this.entropy.set(nextCoord.x, nextCoord.y, centerColour);

        // update the entropy values of neighbouring cells. Wrapping doesn't matter.
        this.entropy.iterateN(this.n, nextCoord, (c, cell) => {
            if (typeof cell === "number") {
                this.entropy.set(c.x, c.y, this.getEntropy(c), true);
            }
        });
    }

    getImage(): Matrix<Hex> {
        const dataCopy = this.entropy.data.map((row) =>
            row.map((cell) => {
                if (typeof cell === "number") {
                    return "#5f7fe8";
                } else {
                    return cell;
                }
            }),
        );

        return new Matrix<Hex>(
            dataCopy,
            this.entropy.width,
            this.entropy.height,
        );
    }

    getCompatiblePatterns(coord: Coord): Pattern[] {
        const compatiblePatterns: Pattern[] = [];
        const constraints: (Hex | null)[] = [];
        this.entropy.iterateN(this.n, coord, (c, cell) => {
            if (typeof cell === "string") {
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
                compatiblePatterns.push(pattern);
            }
        }

        return compatiblePatterns;
    }

    getEntropy(coord: Coord): number {
        return this.getCompatiblePatterns(coord).length;
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
        this.image.iterateN(this.n, { x, y }, (coord, cell) => {
            pattern.push(cell);
        });

        return pattern;
    }
}
