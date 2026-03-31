<script lang="ts">
  export let min: number
  export let max: number
  export let step: number
  export let value: number
  export let onChange: (value: number) => void

  function handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement
    const next = Number(target.value)
    if (Number.isFinite(next)) {
      onChange(next)
    }
  }
</script>

<input
  type="range"
  class="range range-primary w-full"
  {min}
  {max}
  {step}
  {value}
  on:input={handleInput}
/>
