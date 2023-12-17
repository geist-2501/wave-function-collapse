import { floor } from "lodash";
import type { Coord } from "$lib/Coord";

export class Matrix<T> {
    constructor(
        public readonly data: T[][],
        public readonly width: number,
        public readonly height: number,
    ) {}

    get(x: number, y: number, wrap = false): T {
        let ax = x;
        let ay = y;
        if (wrap) {
            ax = ((x % this.width) + this.width) % this.width;
            ay = ((y % this.height) + this.height) % this.height;
        }

        return this.data[ay][ax];
    }

    set(x: number, y: number, val: T, wrap = false) {
        let ax = x;
        let ay = y;
        if (wrap) {
            ax = ((x % this.width) + this.width) % this.width;
            ay = ((y % this.height) + this.height) % this.height;
        }

        this.data[ay][ax] = val;
    }

    min(comparator: (value: T) => number): Coord {
        let minValue = comparator(this.get(0, 0));
        let minValueCoord: Coord = { x: 0, y: 0 };
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const currentVal = comparator(this.get(x, y));
                if (currentVal < minValue) {
                    minValue = currentVal;
                    minValueCoord = { x, y };
                }
            }
        }

        return minValueCoord;
    }

    all(predicate: (value: T) => boolean): boolean {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const value = this.get(x, y);
                if (!predicate(value)) {
                    return false;
                }
            }
        }

        return true;
    }

    static initialise<V>(
        initialValue: V,
        width: number,
        height: number,
    ): Matrix<V> {
        const data: V[][] = [];
        for (let y = 0; y < height; y++) {
            data[y] = [];
            for (let x = 0; x < width; x++) {
                data[y][x] = initialValue;
            }
        }

        return new Matrix<V>(data, width, height);
    }

    iterateN(n: number, coord: Coord, func: (coord: Coord, cell: T) => void) {
        const { x, y } = coord;
        const max = n * n;
        const offset = floor(n / 2);
        for (let i = 0; i < max; i++) {
            const dx = i % n;
            const dy = floor(i / n);
            const coord = {
                x: x + dx - offset,
                y: y + dy - offset,
            };
            const cell = this.get(coord.x, coord.y, true);
            func(coord, cell);
        }
    }
}
