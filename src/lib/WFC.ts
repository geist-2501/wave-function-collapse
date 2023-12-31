import type { Hex } from "$lib/RGB";
import { random } from "lodash";
import { Matrix } from "$lib/Matrix";
import type { Coord } from "$lib/Coord";
import type { Pattern } from "$lib/Pattern";
import { reflect, rotate } from "$lib/Pattern";

export default class WFC {
    private readonly n = 3;
    private readonly image: Matrix<Hex>;
    private readonly baseEntropy: number;
    private readonly maxEntropy: number;

    public patterns: Pattern[] = [];
    public colours: Hex[] = [];
    public entropy: Matrix<Hex | number>;

    public halted: boolean = false;

    public randomResolve: boolean = false;

    constructor(image: Matrix<Hex>, width: number = 40, height: number = 40) {
        this.image = image;

        this.patterns = this.countPatterns();
        this.colours = this.countColours();

        this.baseEntropy = this.patterns.length;
        this.maxEntropy = this.baseEntropy + 1;
        this.entropy = Matrix.initialise<Hex | number>(
            this.baseEntropy,
            width,
            height,
        );
    }

    step() {
        if (this.halted) {
            return;
        }

        if (this.entropy.all((cell) => typeof cell === "string")) {
            console.log("No more cells to collapse");
            this.halted = true;
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
            if (this.randomResolve) {
                console.log(
                    "No more matching patterns, randomly resolving to a colour",
                );
                const randomColour =
                    this.colours[random(this.colours.length - 1)];
                this.entropy.set(nextCoord.x, nextCoord.y, randomColour);
            } else {
                console.log("No more matching patterns");
                this.halted = true;
                return;
            }
        } else {
            const selectedPattern = patterns[random(patterns.length - 1)];
            const centerColour =
                selectedPattern[Math.floor((this.n * this.n) / 2)];

            this.entropy.set(nextCoord.x, nextCoord.y, centerColour);
        }

        // update the entropy values of neighbouring cells. Wrapping doesn't matter.
        this.entropy.iterateN(this.n, nextCoord, (c, cell) => {
            if (typeof cell === "number") {
                this.entropy.set(c.x, c.y, this.getEntropy(c), true);
            }
        });
    }

    getDebugImage(): Matrix<Hex | number> {
        return this.entropy;
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
        const allPatterns: Pattern[] = [];
        for (let x = 0; x < this.image.width; x++) {
            for (let y = 0; y < this.image.height; y++) {
                const originalPattern = this.getPattern(x, y);

                // Flip, rotate patterns.
                const variations = [originalPattern];
                variations.push(reflect(originalPattern, this.n));
                variations.push(rotate(originalPattern, this.n));
                variations.push(reflect(variations[2], this.n));
                variations.push(rotate(variations[2], this.n));
                variations.push(reflect(variations[4], this.n));
                variations.push(rotate(variations[4], this.n));
                variations.push(reflect(variations[6], this.n));

                for (const variation of variations) {
                    allPatterns.push(variation);
                }
            }
        }

        return allPatterns;
    }

    getPattern(x: number, y: number): Pattern {
        const pattern: Pattern = [];
        this.image.iterateN(this.n, { x, y }, (coord, cell) => {
            pattern.push(cell);
        });

        return pattern;
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
}
