<script lang="ts">
    import WFC from "$lib/WFC";
    import { onMount } from "svelte";
    import CanvasRenderer from "$lib/CanvasRenderer";
    import { RawImage } from "$lib/image";

    let root: HTMLElement;
    let wfc: WFC | null = null;
    onMount(() => {
        const image = RawImage.loadImage("img");
        console.log(image);
        const mainImage = new CanvasRenderer(root, 20, 10);
        wfc = new WFC(mainImage);
    });

    setInterval(() => {
        wfc?.step();
    }, 500);
</script>

<h1>WFC</h1>
<img src="Dungeon.png" alt="source" id="img" />
<div bind:this={root}></div>
