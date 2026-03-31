<script lang="ts">
  import StatBox from '$lib/components/StatBox.svelte'

  export let eyebrow: string
  export let title: string
  export let subtitle: string
  export let stats: Array<{ label: string; value: string }>
  export let ctaHref: string
  export let ctaLabel: string
  export let secondaryCtaHref: string = ''
  export let secondaryCtaLabel: string = ''
</script>

<section>
  <div class="flex flex-col gap-10 lg:flex-row lg:items-start">
    <div class="space-y-6">
      <div class="text-primary text-xs font-semibold uppercase tracking-[0.24em]">{eyebrow}</div>
      <div class="space-y-4">
        <h1 class="text-4xl font-semibold leading-tight">
          {title}
        </h1>
        <p class="text-lg leading-8 text-base-content/80">
          {subtitle}
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a class="btn btn-primary btn-lg" href={ctaHref}>{ctaLabel}</a>
        {#if secondaryCtaLabel}
          <a class="btn btn-ghost btn-lg" href={secondaryCtaHref}>{secondaryCtaLabel}</a>
        {/if}
      </div>
      <div class="flex flex-wrap gap-1">
        {#each stats as stat (stat.label)}
          <div>
            <StatBox label={stat.label} value={stat.value} />
          </div>
        {/each}
      </div>
    </div>

    <slot />
  </div>
</section>
