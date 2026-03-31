<script lang="ts">
  export let eyebrow: string
  export let title: string
  export let description: string
</script>

<section class="rounded-box border border-base-300 bg-base-100/85 p-5 sm:p-6">
  <div class="space-y-2 border-b border-base-300/80 pb-5">
    <p class="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
    <h3 class="text-2xl font-semibold tracking-tight text-base-content md:text-[1.7rem]">{title}</h3>
    <p class="max-w-2xl text-sm leading-6 text-base-content/75">{description}</p>
  </div>
  <div class="mt-5 space-y-6">
    <slot />
  </div>
</section>