<script lang="ts">
  import WFC from "$lib/WFC";
  import {onMount} from "svelte";
  import CanvasRenderer from "$lib/CanvasRenderer";
  import {ImageLoader} from "$lib/ImageLoader";

  let root: HTMLElement;
  let wfc: WFC | null = null;
  let error: string | null = null;
  let renderer: CanvasRenderer | null = null;
  onMount(() => {
    renderer = new CanvasRenderer(root, 10);

    try {
      const image = ImageLoader.loadImage("img");
      wfc = new WFC(image);
      renderer.draw(image);
    } catch (e) {
      error = "Could not load image";
    }
  });

  const step = () => {
    if (wfc && renderer) {
      wfc.step();
      const image = wfc.getImage();
      renderer.draw(image);
    }
  };

  const complete = () => {
    if (!(wfc && renderer)) {
      return;
    }

    setTimeout(() => {
      step();
      if (!wfc?.halted) {
        complete();
      }
    }, 100);
  }
</script>

<h1>WFC</h1>
{#if error}
    <p>An error occurred: {error}</p>
{:else}
    <img src="Dungeon.png" alt="source" id="img"/>
    <div bind:this={root}></div>
    <button on:click={step}>Step</button>
    <button on:click={complete}>Complete</button>
{/if}
