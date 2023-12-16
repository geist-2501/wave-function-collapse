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

        const result = WFC.countColours(mockImage);

        expect(result.length).toBe(4);
        expect(result).toContain("#ff");
        expect(result).toContain("#00");
        expect(result).toContain("#11");
        expect(result).toContain("#22");
    });
});
