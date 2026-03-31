<script lang="ts" generics="T extends string">
  export let label: string
  export let hint: string
  export let value: T
  export let options: Array<{ value: T; label: string }>
  export let columns: '3' | '4' = '3'
  export let onChange: (value: T) => void

  $: optionWidthClass =
    columns === '4'
      ? 'w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.375rem)]'
      : 'w-[calc(50%-0.25rem)] lg:w-[calc(33.333%-0.375rem)]'
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between gap-3">
    <span class="label-text font-semibold text-base-content">{label}</span>
    <span class="text-xs text-base-content/60">{hint}</span>
  </div>
  <div class="flex flex-wrap gap-2">
    {#each options as option (option.value)}
      <button
        type="button"
        class={`btn h-auto min-h-0 px-4 py-3 text-left text-sm font-semibold normal-case ${optionWidthClass} ${value === option.value ? 'btn-primary' : 'btn-outline'}`}
        on:click={() => onChange(option.value)}
      >
        {option.label}
      </button>
    {/each}
  </div>
</div>