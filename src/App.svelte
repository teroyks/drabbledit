<script>
  import * as clipboard from "clipboard-polyfill";
  import Editor from "./Editor.svelte";
  import Modal from "./Modal.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let wordcount = 0;
  let previewVisible = false;

  const showPreview = () => (previewVisible = true);
  const hidePreview = () => (previewVisible = false);

  const copyToClipboard = () => {
    const drabble = `${localStorage.getItem("title")}\n\n${localStorage.getItem(
      "text"
    )}`;
    clipboard.writeText(drabble).catch(err => {
      alert("ERROR: copying failed");
      console.error(err);
    });
  };
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

    display: flex;
    flex-flow: column;
    height: 100%;
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
  <button on:click={showPreview}>
    <i class="far fa-file" />
    Preview
  </button>
  <button on:click={copyToClipboard}>
    <i class="far fa-clipboard" />
    Copy
  </button>
</footer>

{#if previewVisible}
  <Modal on:close={hidePreview}>
    <h2 slot="header">{localStorage.getItem('title')}</h2>

    <pre>{localStorage.getItem('text')}</pre>
  </Modal>
{/if}
