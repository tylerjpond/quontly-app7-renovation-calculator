<script lang="ts">
  export let label: string
  export let value: string
  export let detail: string
  export let tone: 'default' | 'primary' = 'default'
  export let valueClassName = ''
</script>

<article class={`card border ${tone === 'primary' ? 'border-primary/30 bg-primary/8' : 'border-base-300 bg-base-100'}`}>
  <div class="card-body gap-2">
    <p class="text-xs uppercase tracking-[0.2em] text-base-content/70">{label}</p>
    <p class={`text-[clamp(1.05rem,2.1vw,1.65rem)] font-semibold leading-tight ${valueClassName}`}>{value}</p>
    <p class="text-sm text-base-content/80">{detail}</p>
  </div>
</article>