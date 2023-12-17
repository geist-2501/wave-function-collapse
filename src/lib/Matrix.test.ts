import { Matrix } from "$lib/Matrix";

describe("matrix", () => {
    describe("all", () => {
        it("should return true when all cells match predicate", () => {
            let data = [
                ["A", "A"],
                ["A", "A"],
            ];
            const matrix = new Matrix<string>(data, data.length, data.length);

            const result = matrix.all((cell) => cell === "A");
            expect(result).toBe(true);
        });
        it("should return false when only some cells match predicate", () => {
            let data = [
                ["A", "B"],
                ["A", "C"],
            ];
            const matrix = new Matrix<string>(data, data.length, data.length);

            const result = matrix.all((cell) => cell === "A");
            expect(result).toBe(false);
        });
    });
});
