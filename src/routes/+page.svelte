<script lang="ts">
  import WFC from "$lib/WFC";
  import {onMount} from "svelte";
  import CanvasRenderer, {debugRenderFunc} from "$lib/CanvasRenderer";
  import {ImageLoader} from "$lib/ImageLoader";

  let root: HTMLElement;
  let wfc: WFC | null = null;
  let error: string | null = null;
  let renderer: CanvasRenderer | null = null;
  onMount(() => {
    renderer = new CanvasRenderer(root, 15, debugRenderFunc);
    reset();
  });

  const reset = () => {
    try {
      const image = ImageLoader.loadImage("img");
      wfc = new WFC(image, 30, 30);
      wfc.randomResolve = true;
      renderer?.draw(image);
    } catch (e) {
      error = "Could not load image";
    }
  };

  const step = () => {
    if (wfc && renderer) {
      wfc.step();
      const image = wfc.getDebugImage();
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
    }, 10);
  }

  const completeFast = () => {
    if (!(wfc && renderer)) {
      return;
    }

    while (!wfc.halted) {
      wfc.step();
    }

    const image = wfc.getImage();
    renderer.draw(image);
  }
</script>

<h1>WFC</h1>
{#if error}
    <p>An error occurred: {error}</p>
{:else}
    <div class="header">
        <button on:click={reset}>Reset</button>
        <button on:click={step}>Step</button>
        <button on:click={complete}>Complete Slowly</button>
        <button on:click={completeFast}>Complete Quickly</button>
    </div>
    <img src="Dungeon.png" alt="source" id="img"/>
    <div class="canvas" bind:this={root}></div>
{/if}

<style>
    .header {
        display: flex;
        flex-direction: row;
    }

    .canvas {
        width: 100vw;
        height: 80vh;
    }
</style>
