<script lang="ts">
  export let min: number
  export let max: number
  export let step: number
  export let value: number
  export let startLabel: string | null = null
  export let endLabel: string | null = null
  export let classes: string = ''
  export let onChange: (value: number) => void

  function handleInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement
    const next = Number(target.value)
    if (Number.isFinite(next)) {
      onChange(next)
    }
  }
</script>

<label class="input input-bordered w-full bg-base-100">
  {#if startLabel}
    <span class="label font-semibold">{startLabel}</span>
  {/if}

  <input
    type="number"
    class={`w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${classes}`}
    {min}
    {max}
    {step}
    {value}
    on:input={handleInput}
  />

  {#if endLabel}
    <span class="label font-semibold">{endLabel}</span>
  {/if}
</label>
