<script>
  // Editable title component with "magic" content
  // - automatically fills in default title on page load if title is empty
  // - default title vanishes when the user starts writing
  // - on blur, default title reappears if title is empty
  import { onMount } from "svelte";

  const defaultTitle = "Title: A Drabble";

  const State = {
    NotUpdated: "Not updated",
    Updated: "Updated",
    Deleted: "Deleted",
    Pending: "Pending"
  };

  const Action = {
    Blur: "Blur",
    Key: "Key", // key press
    InterruptClear: "Interrupt - Clear" // automatic interruption
  };

  // current state of the title
  let currentState;

  // action performed on the title element
  let uiAction;

  // title DOM element
  let element;

  // title text
  let title = localStorage.getItem("title") || defaultTitle;
  // keep tabs on whether title was updated to avoid
  // unnecessary actions (on control keys etc.)
  let oldTitle;

  // handle title action when has a value
  $: uiAction && handleAction();
  $: updateTitle(title);

  const saveTitle = () => localStorage.setItem("title", title);

  const titleChanged = () => title !== oldTitle;
  const removeDefaultTitle = () => {
    uiAction = Action.InterruptClear;
    currentState = State.Pending;
    title = "";
  };

  const emitKey = () => (uiAction = Action.Key);
  const emitBlur = () => (uiAction = Action.Blur);

  const handleAction = () => {
    // console.table({
    //   method: "handleAction",
    //   uiAction,
    //   currentState,
    //   title
    // });
    switch (uiAction) {
      case Action.Blur:
        if (!title) title = defaultTitle;
        break;
      case Action.InterruptClear:
        break;
      case Action.Key:
        if (!currentState === State.Pending) oldTitle = title;
        switch (currentState) {
          case State.NotUpdated:
          case State.Deleted:
            // console.debug("check page load situation");
            if (title === defaultTitle) {
              // console.debug("remove default title");
              removeDefaultTitle();
            }
            break;
          case State.Updated:
            break;
          default:
            console.error(`unhandled currentState: ${currentState}`);
        }
        break;
    }
  };

  const updateTitle = _ => {
    // console.table({
    //   method: "updateTitle",
    //   uiAction,
    //   currentState,
    //   title
    // });
    const action = uiAction;
    if (currentState !== State.Pending) uiAction = null; // reset
    switch (action) {
      case Action.InterruptClear:
        // console.debug("automatically triggered update");
        currentState = State.Pending;
        saveTitle();
        uiAction = Action.Key;
        break;
      case Action.Key:
        // console.debug("...by key pressed");
        if (titleChanged()) {
          // console.debug("title changed:", title);
          currentState = title ? State.Updated : State.Deleted;
          saveTitle();
        }
        break;
      case Action.Blur:
        break;
      case undefined:
      case null:
        // console.debug("no user edit");
        if (!title) console.debug("title is empty");
        break;
      default:
        console.error("Unknown action:", action);
    }
    // console.debug("State after update:", currentState);
  };

  onMount(() => {
    element.focus();
    currentState = State.NotUpdated;
  });
</script>

<style>
  h1 {
    color: #00705e;
    font-size: 4rem;
    font-weight: 100;
    text-align: center;
  }
</style>

<h1
  contenteditable="true"
  bind:textContent={title}
  bind:this={element}
  on:keydown={emitKey}
  on:blur={emitBlur}>
  {defaultTitle}
</h1>
