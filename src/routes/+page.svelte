<script lang="ts">
    import WFC from "$lib/WFC";
    import { onMount } from "svelte";
    import CanvasRenderer from "$lib/CanvasRenderer";
    import { RawImage } from "$lib/RawImage";

    let root: HTMLElement;
    let wfc: WFC | null = null;
    let error: string | null = null;
    onMount(() => {
        const image = RawImage.loadImage("img");

        if (image == null) {
            error = "Couldn't load image";
            return;
        }

        const mainImage = new CanvasRenderer(root, image, 10);
        wfc = new WFC(mainImage);
    });
</script>

<h1>WFC</h1>
{#if error}
    <p>An error occurred: {error}</p>
{:else}
    <img src="Dungeon.png" alt="source" id="img" />
    <div bind:this={root}></div>
{/if}
