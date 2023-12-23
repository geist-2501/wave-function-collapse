import {reflect, rotate} from "$lib/Pattern";

describe("pattern", () => {
    it("should rotate", () => {
        const pattern = [..."123456789"];
        const rotated = rotate(pattern, 3);
        expect(rotated).toEqual([..."369258147"]);
    });
    it('should reflect', () => {
        const pattern = [..."123456789"];
        const reflected = reflect(pattern, 3);
        expect(reflected).toEqual([..."321654987"]);
    });
});
