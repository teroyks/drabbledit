<script>
  import Editor from "./Editor.svelte";
  import Modal from "./Modal.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let wordcount = 0;
  let previewVisible = false;

  const showPreview = () => (previewVisible = true);
  const hidePreview = () => (previewVisible = false);
</script>

<style>
  header {
    flex: 0 1 auto;
    margin-bottom: 1rem;
    margin-top: 8px;

    text-align: center;
  }

  main {
    flex: 1 1 auto;
    width: 100%;
    margin: 0 auto;
  }

  footer {
    flex: 0 1 auto;
  }

  pre {
    white-space: pre-wrap;
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
<footer>
  <button on:click={showPreview}>Preview</button>
</footer>

{#if previewVisible}
  <Modal on:close={hidePreview}>
    <h2 slot="header">{localStorage.getItem('title')}</h2>

    <pre>{localStorage.getItem('text')}</pre>
  </Modal>
{/if}
