<script>
  import Editor from "./Editor.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let wordcount = 0;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #00705e;
    font-size: 4em;
    font-weight: 100;
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

<main>
  <header class={wordcount > 100 ? 'error' : ''}>
    <ProgressBar percentage={wordcount} />
  </header>
  <h1 contenteditable="true">Title: a Drabble</h1>
  <Editor bind:wordcount />
</main>
