<script>
  // from: https://svelte.dev/repl/40f4c7846e6f4052927ff5f9c5271b66?version=3.18.1

  export let value = "";
  export let minRows = 1;
  export let maxRows;
  export let placeholder = "";

  $: minHeight = `${1 + minRows * 1.2}em`;
  $: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<style>
  .container {
    position: relative;
  }

  pre,
  textarea {
    font-family: inherit;
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #eee;
    line-height: 1.2;
    overflow: hidden;
  }

  textarea {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    resize: none;
  }
</style>

<div class="container">
  <pre
    aria-hidden="true"
    style="min-height: {minHeight}; max-height: {maxHeight}">
    {value + '\n'}
  </pre>

  <textarea bind:value {placeholder} />
</div>
