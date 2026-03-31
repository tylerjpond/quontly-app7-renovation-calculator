<script lang="ts">
  export let eyebrow: string
  export let title: string
  export let description: string
</script>

<div class="space-y-3">
  <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
  <h2 class="text-4xl font-semibold tracking-tight text-base-content sm:text-5xl">{title}</h2>
  <p class="text-lg leading-8 text-base-content/80">{description}</p>
</div>