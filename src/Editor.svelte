<script>
  import countWords from "./helpers/wordcount";
  import Title from "./EditableTitle.svelte";
  import TextArea from "./TextArea.svelte";
  let drabbleText = localStorage.getItem("text") || "";

  export let wordcount;
  $: wordcount = countWords(drabbleText);

  $: localStorage.setItem("text", drabbleText);
  $: localStorage.setItem("word count", wordcount);
</script>

<style>
  article {
    display: grid;
    grid-template-rows: min-content auto;
    width: 100%;
  }
</style>

<article>
  <Title />
  <TextArea
    bind:value={drabbleText}
    placeholder="Write here. 🚀"
    minRows={4}
    maxRows={40} />
</article>
