<script>
  export let value = "";
  export let minRows = 1; // not used
  export let maxRows; // not used
  export let placeholder = "";
</script>

<style>
  textarea {
    font-family: inherit;
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #eee;
    line-height: 1.2;
    overflow: hidden;
  }
</style>

<textarea bind:value {placeholder} />
