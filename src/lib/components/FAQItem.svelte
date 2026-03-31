<script lang="ts">
  export let question: string
  export let answer: string
</script>

<div class="collapse collapse-arrow border border-base-300 bg-base-100/90">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-semibold">{question}</div>
  <div class="collapse-content leading-7 text-base-content/75">
    <p>{answer}</p>
  </div>
</div>
