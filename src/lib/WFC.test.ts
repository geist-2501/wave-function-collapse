import { RawImage } from "$lib/RawImage";
import WFC from "$lib/WFC";

describe("WFC", () => {
    it("should count colours", () => {
        const imageData = [
            ["#ff", "#ff", "#00"],
            ["#ff", "#11", "#ff"],
            ["#22", "#ff", "#ff"],
        ];
        const mockImage = new RawImage(
            imageData,
            imageData.length,
            imageData.length,
        );
        const wfc = new WFC(mockImage);

        const result = wfc.countColours();

        expect(result.length).toBe(4);
        expect(result).toContain("#ff");
        expect(result).toContain("#00");
        expect(result).toContain("#11");
        expect(result).toContain("#22");
    });
    it("should count patterns (2x2)", () => {
        const imageData = [
            ["A", "B"],
            ["A", "A"],
        ];
        const mockImage = new RawImage(
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
        const mockImage = new RawImage(
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
        const mockImage = new RawImage(
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
        const mockImage = new RawImage(
            imageData,
            imageData.length,
            imageData.length,
        );
        const wfc = new WFC(mockImage);
        const result = wfc.getPattern(0, 0);
        expect(result).toEqual([..."AAABAAAAC"]);
    });
});
