import { rotate } from "$lib/Pattern";

describe("pattern", () => {
    describe("rotate", () => {
        const pattern = [...[..."123"], ...[..."456"], ...[..."789"]];
        const rotated = rotate(pattern, 3);
        expect(rotated).toEqual([...[..."123"], ...[..."456"], ...[..."789"]]);
    });
});
