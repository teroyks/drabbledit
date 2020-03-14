<script>
  // Editable title component with "magic" content
  // - automatically fills in default title on page load if title is empty
  // - default title vanishes when the user starts writing
  // - on blur, default title reappears if title is empty
  import { onMount } from "svelte";

  const defaultTitle = "Title: A Drabble";

  // title DOM element
  let element;

  // title text
  let title = localStorage.getItem("title") || defaultTitle;

  $: localStorage.setItem("title", title);

  const removeDefaultTitle = () => {
    if (title === defaultTitle) title = "";
  };

  const restoreDefaultTitleIfEmpty = () => (title = title || defaultTitle);

  const onKeyPress = () => removeDefaultTitle();
  const onBlur = () => restoreDefaultTitleIfEmpty();

  onMount(() => {
    element.focus();
  });
</script>

<style>
  h1 {
    color: #00705e;
    font-size: 4rem;
    font-weight: 100;
    text-align: center;
    margin-top: 0;
    margin-bottom: 1rem;
  }
</style>

<h1
  contenteditable="true"
  bind:textContent={title}
  bind:this={element}
  on:keypress={onKeyPress}
  on:blur={onBlur}>
  {defaultTitle}
</h1>
