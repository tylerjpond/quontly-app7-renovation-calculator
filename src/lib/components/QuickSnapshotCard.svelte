<script lang="ts">
  import ResultCard from '$lib/components/ResultCard.svelte'

  export let estimate: any | null = null
  export let tierLabel: string
  export let squareFeet: number
  export let currency: Intl.NumberFormat

  const wholeNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
</script>

<div class="card border border-primary/25 bg-base-100/92 shadow-xl shadow-primary/10">
  <div class="card-body gap-5">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Quick snapshot</p>
    <div class="space-y-3">
      <div>
        <p class="text-sm text-base-content/60">Estimated range</p>
        <p class="wrap-break-word text-[clamp(1.9rem,4.8vw,2.35rem)] font-semibold leading-tight">
          {estimate ? `${currency.format(estimate.low)} - ${currency.format(estimate.high)}` : '$0 - $0'}
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <div class="w-full rounded-box border border-base-300 bg-base-200/60 p-4 sm:w-[calc(50%-0.375rem)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Tier</p>
          <p class="mt-2 text-2xl font-semibold">{tierLabel}</p>
        </div>
        <div class="w-full rounded-box border border-base-300 bg-base-200/60 p-4 sm:w-[calc(50%-0.375rem)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Size</p>
          <p class="mt-2 text-2xl font-semibold">{wholeNumber.format(squareFeet)} sq ft</p>
        </div>
      </div>
    </div>
    <p class="rounded-box bg-base-200 p-4 text-sm leading-6 text-base-content/70">
      Planning estimate only. Confirm scope, permits, and local labor pricing with licensed professionals.
    </p>
  </div>
</div>
