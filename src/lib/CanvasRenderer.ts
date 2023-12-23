import Two from "two.js";
import type { Matrix } from "$lib/Matrix";
import type { Hex } from "./RGB";
import type { Coord } from "$lib/Coord";

type RenderFunc<T> = (two: Two, ppi: number, cell: T, coord: Coord) => void;

export default class CanvasRenderer<T> {
    private readonly two: Two;
    private readonly ppi: number;
    private readonly renderCellFunc: RenderFunc<T>;

    constructor(root: HTMLElement, ppi: number, renderCellFunc: RenderFunc<T>) {
        this.two = new Two({}).appendTo(root);
        this.ppi = ppi;
        this.renderCellFunc = renderCellFunc;
    }

    draw(image: Matrix<T>) {
        this.two.clear();

        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                this.renderCellFunc(this.two, this.ppi, image.get(x, y), {
                    x,
                    y,
                });
            }
        }

        this.two.update();
    }
}

export const normalRenderFunc: RenderFunc<Hex> = (two, ppi, cell, coord) => {
    const offset = ppi / 2;
    const rect = two.makeRectangle(
        offset + coord.x * ppi,
        offset + coord.y * ppi,
        ppi,
        ppi,
    );
    rect.fill = cell;
};

export const debugRenderFunc: RenderFunc<Hex | number> = (
    two,
    ppi,
    cell,
    coord,
) => {
    const offset = ppi / 2;
    if (typeof cell === "string") {
        const rect = two.makeRectangle(
            offset + coord.x * ppi,
            offset + coord.y * ppi,
            ppi,
            ppi,
        );
        rect.fill = cell;
    } else {
        two.makeText(
            cell.toString(),
            offset + coord.x * ppi,
            offset + coord.y * ppi,
        );
    }
};
