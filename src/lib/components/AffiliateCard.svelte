<script lang="ts">
  export let title: string
  export let badge: string
  export let description: string
  export let highlights: string[]
  export let ctaLabel: string
  export let href: string
  export let disclosureTag: string
</script>

<article class="card h-full border border-base-300 bg-base-100/90 shadow-sm">
  <div class="card-body h-full gap-4">
    <div class="flex items-start justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold">{title}</h2>
        <p class="mt-1 text-sm text-base-content/60">{disclosureTag}</p>
      </div>
      <span class="badge badge-outline border-primary/40 text-primary whitespace-nowrap">{badge}</span>
    </div>
    <p class="leading-7 text-base-content/75">{description}</p>
    <ul class="space-y-2 text-sm text-base-content/75">
      {#each highlights as highlight (highlight)}
        <li class="flex gap-2">
          <span class="mt-2 h-2 w-2 bg-primary" aria-hidden="true"></span>
          <span>{highlight}</span>
        </li>
      {/each}
    </ul>
    <div class="card-actions mt-auto justify-between gap-2">
      <a class="btn btn-primary" {href} target="_blank" rel="noreferrer">{ctaLabel}</a>
      <span class="text-right text-xs text-base-content/60">FTC disclosure applies</span>
    </div>
  </div>
</article>
