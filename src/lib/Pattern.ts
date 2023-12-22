import type { Hex } from "$lib/RGB";

export type Pattern = Hex[];

const mutate = (func: (x: number, y: number) => Hex, n: number): Pattern => {
    const p: Pattern = new Array(n * n);
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            p[x + y * n] = func(x, y);
        }
    }

    return p;
};

export const rotate = (pattern: Pattern, n: number): Pattern =>
    mutate((x, y) => pattern[n - 1 - y + x * n], n);

export const reflect = (pattern: Pattern, n: number): Pattern =>
    mutate((x, y) => pattern[n - 1 - x + y * n], n);
