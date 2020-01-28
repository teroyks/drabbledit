<script>
  import Editor from "./Editor.svelte";

  let wordcount = 0;

  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <header>word count: {wordcount}</header>
  <h1 contenteditable="true">Hello {name}!</h1>
  <Editor bind:wordcount />
</main>
