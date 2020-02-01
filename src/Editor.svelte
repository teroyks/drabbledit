<script>
  import countWords from "./helpers/wordcount";
  import TextArea from "./TextAreaAutosize.svelte";

  const defaultTitle = "Title";

  let title = localStorage.getItem("title") || defaultTitle;
  let drabbleText = localStorage.getItem("text") || "";

  export let wordcount;
  $: wordcount = countWords(drabbleText);

  $: localStorage.setItem("title", title.trim());
  $: localStorage.setItem("text", drabbleText);
  $: localStorage.setItem("word count", wordcount);
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
  <h1 id="title" contenteditable="true" bind:textContent={title}>{title}</h1>
  <TextArea
    bind:value={drabbleText}
    placeholder="Write here. 🚀"
    minRows={4}
    maxRows={40} />
</article>

<!-- <pre>{drabbleText}</pre> -->
