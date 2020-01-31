<script>
  export let percentage;

  $: overLimit = percentage > 100;
</script>

<style>
  progress {
    background-color: #f3f3f3;
    border: 0;
    width: 80%;
    height: 18px;
    border-radius: 9px;
  }

  progress::-webkit-progress-bar {
    background-color: #f3f3f3;
    border-radius: 9px;
  }
  progress::-webkit-progress-value {
    background: #cdeb8e;
    border-radius: 9px;
  }
  progress.overLimit::-webkit-progress-value {
    background-color: darkred;
    border-radius: 9px;
  }

  progress::-moz-progress-bar {
    background: #cdeb8e;
    border-radius: 9px;
  }
  progress.overLimit::-moz-progress-bar {
    background-color: darkred;
    border-radius: 9px;
  }

  .progress-value {
    padding: 0px 5px;
    line-height: 20px;
    margin-left: 5px;
    font-size: 0.8em;
    color: #555;
    height: 18px;
    float: right;
  }

  .overLimit {
    color: darkred;
  }
</style>

<div>
  <progress class:overLimit value={percentage} max="100" />
  <span class="progress-value" class:overLimit>word count {percentage}</span>
</div>
