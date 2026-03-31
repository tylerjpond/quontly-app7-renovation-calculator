<script lang="ts">
  export let eyebrow: string
  export let title: string
  export let paragraphs: string[]
</script>

<article class="card border border-base-300 bg-base-100/90 shadow-sm">
  <div class="card-body gap-4">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
    <h2 class="text-2xl font-semibold">{title}</h2>
    <div class="space-y-4 leading-7 text-base-content/75">
      {#each paragraphs as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
    </div>
  </div>
</article>
