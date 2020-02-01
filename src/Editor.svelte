<script>
  import { onMount } from "svelte";
  import countWords from "./helpers/wordcount";
  import TextArea from "./TextAreaAutosize.svelte";

  const TitleState = {
    NotUpdated: "Not updated",
    Updated: "Updated",
    Deleted: "Deleted",
    Pending: "Pending"
  };

  const TitleAction = {
    Blur: "Blur",
    Key: "Key",
    InterruptClear: "Interrupt - Clear"
  };

  const defaultTitle = "Title: A Drabble";

  // current state of the title
  let titleState;

  // action performed on the title element
  let titleAction;

  // title DOM element
  let titleElement;

  // title text
  let title = localStorage.getItem("title") || defaultTitle;
  // keep tabs on whether title was updated to avoid
  // unnecessary actions (on control keys etc.)
  let oldTitle;

  let drabbleText = localStorage.getItem("text") || "";

  export let wordcount;
  $: wordcount = countWords(drabbleText);

  $: localStorage.setItem("text", drabbleText);
  $: localStorage.setItem("word count", wordcount);

  // handle title action when has a value
  $: titleAction && handleTitleAction();
  $: updateTitle(title);

  const titleChanged = () => title !== oldTitle;
  const removeDefaultTitle = () => {
    titleAction = TitleAction.InterruptClear;
    titleState = TitleState.Pending;
    title = "";
  };

  const emitTitleKey = () => (titleAction = TitleAction.Key);
  const emitTitleBlur = () => (titleAction = TitleAction.Blur);

  const handleTitleAction = () => {
    // console.table({
    //   method: "handleTitleAction",
    //   titleAction,
    //   titleState,
    //   title
    // });
    switch (titleAction) {
      case TitleAction.Blur:
        if (!title) title = defaultTitle;
        break;
      case TitleAction.InterruptClear:
        break;
      case TitleAction.Key:
        if (!titleState === TitleState.Pending) oldTitle = title;
        switch (titleState) {
          case TitleState.NotUpdated:
          case TitleState.Deleted:
            // console.debug("check page load situation");
            if (title === defaultTitle) {
              // console.debug("remove default title");
              removeDefaultTitle();
            }
            break;
          case TitleState.Updated:
            break;
          default:
            console.error(`unhandled state: ${titleState}`);
        }
        break;
    }
  };

  const updateTitle = _ => {
    // console.table({
    //   method: "updateTitle",
    //   titleAction,
    //   titleState,
    //   title
    // });
    const action = titleAction;
    if (titleState !== TitleState.Pending) titleAction = null; // reset
    switch (action) {
      case TitleAction.InterruptClear:
        // console.debug("automatically triggered update");
        titleState = TitleState.Pending;
        localStorage.setItem("title", title);
        titleAction = TitleAction.Key;
        break;
      case TitleAction.Key:
        // console.debug("...by key pressed");
        if (titleChanged()) {
          // console.debug("title changed:", title);
          titleState = title ? TitleState.Updated : TitleState.Deleted;
          localStorage.setItem("title", title);
        }
        break;
      case TitleAction.Blur:
        break;
      case undefined:
      case null:
        // console.debug("no user edit");
        if (!title) console.debug("title is empty");
        break;
      default:
        console.error("Unknown action:", action);
    }
    // console.debug("State after update:", titleState);
  };

  onMount(() => {
    titleElement.focus();
    titleState = TitleState.NotUpdated;
  });
</script>

<style>
  h1 {
    color: #00705e;
    font-size: 4rem;
    font-weight: 100;
    text-align: center;
  }

  /* preview */
  pre {
    white-space: pre-line;
  }
</style>

<article>
  <h1
    id="title"
    contenteditable="true"
    bind:textContent={title}
    bind:this={titleElement}
    on:keydown={emitTitleKey}
    on:blur={emitTitleBlur}>
    {defaultTitle}
  </h1>
  <TextArea
    bind:value={drabbleText}
    placeholder="Write here. 🚀"
    minRows={4}
    maxRows={40} />
</article>

<!-- <pre>{drabbleText}</pre> -->
