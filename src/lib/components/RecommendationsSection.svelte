<script lang="ts">
  import AffiliateCard from '$lib/components/AffiliateCard.svelte'
  import SectionHeading from '$lib/components/SectionHeading.svelte'

  export let cards: Array<{
    title: string
    badge: string
    description: string
    highlights: string[]
    ctaLabel: string
    href: string
    disclosureTag: string
  }>
</script>

<section>
  <SectionHeading
    eyebrow="Tools & services"
    title="Recommended partners"
    description="Find specialists, get quotes, and manage your renovation project."
  />
  <div class="flex flex-wrap gap-6">
    {#each cards as card (card.title)}
      <div class="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
        <AffiliateCard {...card} />
      </div>
    {/each}
  </div>
</section>
