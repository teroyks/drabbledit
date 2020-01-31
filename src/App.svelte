<script>
  import { onMount } from "svelte";
  import Editor from "./Editor.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let wordcount = 0;

  onMount(() => {
    document.querySelector("#title").focus();
  });
</script>

<style>
  header {
    text-align: center;
  }

  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .error {
    color: red;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<header class={wordcount > 100 ? 'error' : ''}>
  <ProgressBar percentage={wordcount} />
</header>
<main>
  <Editor bind:wordcount />
</main>
