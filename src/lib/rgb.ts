const d2h = (d: number) => d.toString(16);

const h2d = (h: string) => parseInt(h, 16);

export const mix = (colorA: string, colorB: string, weight: number) => {
    let color = "#";

    for (let i = 0; i <= 5; i += 2) {
        // loop through each of the 3 hex pairs—red, green, and blue
        let v1 = h2d(colorA.substring(i, 2)); // extract the current pairs
        let v2 = h2d(colorB.substring(i, 2));
        // combine the current pairs from each source color, according to the specified weight
        let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

        while (val.length < 2) {
            val = "0" + val;
        } // prepend a '0' if val results in a single digit

        color += val; // concatenate val to our new color string
    }

    return color; // PROFIT!
};
