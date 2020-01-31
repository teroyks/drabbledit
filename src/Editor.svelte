<script>
  import countWords from "./helpers/wordcount";

  import TextArea from "./TextAreaAutosize.svelte";

  let drabbleText = "";

  export let wordcount;
  $: wordcount = countWords(drabbleText);
</script>

<style>
  h1 {
    color: #00705e;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }

  /* preview */
  pre {
    white-space: pre-line;
  }
</style>

<article>
  <h1 id="title" contenteditable="true">Title (A Drabble)</h1>
  <TextArea
    bind:value={drabbleText}
    placeholder="Write here. 🚀"
    minRows={4}
    maxRows={40} />
</article>

<pre>{drabbleText}</pre>
