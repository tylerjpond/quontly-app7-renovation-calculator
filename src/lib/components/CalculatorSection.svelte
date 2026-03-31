<script lang="ts">
  import ControlPanel from '$lib/components/ControlPanel.svelte'
  import ResultCard from '$lib/components/ResultCard.svelte'
  export let estimate: any | null = null

</script>

<section class="flex flex-col gap-8 lg:flex-row lg:items-start">
  <ControlPanel
    eyebrow="Your project"
    title="Tell us what you're renovating"
    description="Choose room types and square footage to see an estimated cost range."
  >
    <slot />
  </ControlPanel>

  <div class="w-full lg:flex-none">
    {#if estimate}
      <ResultCard
        value={`${estimate.low} - ${estimate.high}`}
        label="Cost range"
        detail="Estimated renovation range"
        tone="primary"
      />
    {/if}
  </div>
</section>
