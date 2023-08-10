<script lang="ts">
    import WFC from "$lib/WFC";
    import { onMount } from "svelte";
    import CanvasRenderer from "$lib/CanvasRenderer";

    let root: HTMLElement;
    let wfc: WFC | null = null;
    onMount(() => {
        const mainImage = new CanvasRenderer(root, 20, 10);
        wfc = new WFC(mainImage);
    });

    setInterval(() => {
        wfc?.step();
    }, 500);
</script>

<h1>WFC</h1>
<div bind:this={root}></div>
