<script lang="ts">
  export let value: number
  export let min: number
  export let max: number
  export let step: number = 1
  export let label: string
  export let hint: string = ''
  export let error: string | undefined = undefined
  export let onInput: (v: number) => void

  const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
</script>

<div class="space-y-3">
  <div class="flex items-center justify-between gap-3">
    <span class="label-text font-semibold text-base-content">{label}</span>
    {#if hint}
      <span class="text-xs text-base-content/60">{hint}</span>
    {/if}
  </div>
  <input
    type="range"
    class="range range-primary"
    {min}
    {max}
    {step}
    {value}
    on:input={(event) => onInput(Number((event.currentTarget as HTMLInputElement).value))}
  />
  <input
    type="number"
    class="input input-bordered w-full bg-base-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    {min}
    {max}
    {step}
    {value}
    on:input={(event) => onInput(Number((event.currentTarget as HTMLInputElement).value))}
  />
  {#if error}
    <p class="text-xs text-error">{error}</p>
  {/if}
</div>
