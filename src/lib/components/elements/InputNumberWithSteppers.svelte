<script lang="ts">
  import InputNumber from '$lib/components/elements/InputNumber.svelte'

  export let min: number
  export let max: number
  export let step: number
  export let value: number
  export let startLabel: string | null = null
  export let endLabel: string | null = null
  export let classes: string = ''
  export let onInputChange: (value: number) => void
  export let onStepperDownClick: () => void
  export let onStepperUpClick: () => void
</script>

<div class="join w-full">
  <button class="btn join-item" type="button" on:click={onStepperDownClick} aria-label="Decrease value">-</button>

  <InputNumber
    classes={`join-item ${classes}`}
    startLabel={startLabel}
    endLabel={endLabel}
    {min}
    {max}
    {step}
    {value}
    onChange={onInputChange}
  />

  <button class="btn join-item" type="button" on:click={onStepperUpClick} aria-label="Increase value">+</button>
</div>
