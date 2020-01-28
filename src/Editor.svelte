<script>
  import TextArea from "./TextAreaAutosize.svelte";

  let drabbleText = "";

  export let wordcount;
  $: wordcount = countWords(drabbleText);

  function countWords(text) {
    return text.length; // TODO
  }
</script>

<style>
  article {
    text-align: left;
  }

  /* preview */
  pre {
    white-space: pre-line;
  }
</style>

<article>
  <TextArea
    bind:value={drabbleText}
    placeholder="Write here. 🚀"
    minRows={4}
    maxRows={40} />
</article>

<pre>{drabbleText}</pre>
