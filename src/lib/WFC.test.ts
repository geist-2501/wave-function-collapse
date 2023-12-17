import WFC from "$lib/WFC";
import { Matrix } from "./Matrix";
import type { Hex } from "./RGB";

describe("WFC", () => {
    it("should count patterns (2x2)", () => {
        const imageData = [
            ["A", "B"],
            ["A", "A"],
        ];
        const mockImage = new Matrix<Hex>(
            imageData,
            imageData.length,
            imageData.length,
        );
        const wfc = new WFC(mockImage);

        const result = wfc.countPatterns();
        expect(result.length).toBe(4);
        expect(result).toContainEqual([
            "A",
            "A",
            "A",
            "B",
            "A",
            "B",
            "A",
            "A",
            "A",
        ]);
        expect(result).toContainEqual([
            "A",
            "A",
            "A",
            "A",
            "B",
            "A",
            "A",
            "A",
            "A",
        ]);
        expect(result).toContainEqual([
            "B",
            "A",
            "B",
            "A",
            "A",
            "A",
            "B",
            "A",
            "B",
        ]);
        expect(result).toContainEqual([
            "A",
            "B",
            "A",
            "A",
            "A",
            "A",
            "A",
            "B",
            "A",
        ]);
    });
    it("should count patterns when there is only 1 unique pattern (3x3)", function () {
        const imageData = [
            ["A", "A", "A"],
            ["A", "A", "A"],
            ["A", "A", "A"],
        ];
        const mockImage = new Matrix<Hex>(
            imageData,
            imageData.length,
            imageData.length,
        );
        const wfc = new WFC(mockImage);

        const result = wfc.countPatterns();
        expect(result.length).toBe(1);
        expect(result).toContainEqual([
            "A",
            "A",
            "A",
            "A",
            "A",
            "A",
            "A",
            "A",
            "A",
        ]);
    });
    it("should count patterns (3x3)", function () {
        const imageData = [
            ["A", "A", "B"],
            ["A", "C", "A"],
            ["A", "A", "A"],
        ];
        const mockImage = new Matrix<Hex>(
            imageData,
            imageData.length,
            imageData.length,
        );
        const wfc = new WFC(mockImage);

        const result = wfc.countPatterns();
        expect(result).toContainEqual([..."AAABAAAAC"]);
        expect(result).toContainEqual([..."AAAAABACA"]);
        expect(result).toContainEqual([..."AAAABACAA"]);
        expect(result).toContainEqual([..."BAAAACAAA"]);
        expect(result).toContainEqual([..."AABACAAAA"]);
    });
    it("should gets single pattern", () => {
        const imageData = [
            ["A", "A", "B"],
            ["A", "C", "A"],
            ["A", "A", "A"],
        ];
        const mockImage = new Matrix<Hex>(
            imageData,
            imageData.length,
            imageData.length,
        );
        const wfc = new WFC(mockImage);
        const result = wfc.getPattern(0, 0);
        expect(result).toEqual([..."AAABAAAAC"]);
    });
    describe("entropy", () => {
        it("should get base entropy", () => {
            const imageData = [
                ["A", "B"],
                ["A", "A"],
            ];
            const mockImage = new Matrix<Hex>(
                imageData,
                imageData.length,
                imageData.length,
            );
            const wfc = new WFC(mockImage);
            const entropy = wfc.getEntropy({ x: 0, y: 0 });
            expect(entropy).toBe(4);
        });
        it("should get entropy when constrained", () => {
            const imageData = [
                ["A", "B"],
                ["A", "A"],
            ];
            const mockImage = new Matrix<Hex>(
                imageData,
                imageData.length,
                imageData.length,
            );
            const wfc = new WFC(mockImage);
            wfc.entropy.set(1, 0, "B");
            const entropy = wfc.getEntropy({ x: 0, y: 0 });
            expect(entropy).toBe(1);
        });
    });
});
