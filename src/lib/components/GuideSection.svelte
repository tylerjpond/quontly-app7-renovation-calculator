<script lang="ts">
  import ExplainerCard from '$lib/components/ExplainerCard.svelte'
  import FAQItem from '$lib/components/FAQItem.svelte'
  import SectionHeading from '$lib/components/SectionHeading.svelte'

  export let explainerSections: Array<{
    eyebrow: string
    title: string
    paragraphs: string[]
  }>
  export let faqs: Array<{
    question: string
    answer: string
  }>
</script>

<section class="space-y-20">
  <div class="space-y-8">
    <SectionHeading
      eyebrow="Renovation 101"
      title="Plan your project"
      description="Everything you need to know to get started."
    />
    <div class="flex flex-wrap gap-6">
      {#each explainerSections as section (section.title)}
        <div class="w-full md:w-[calc(50%-0.75rem)]">
          <ExplainerCard {...section} />
        </div>
      {/each}
    </div>
  </div>

  <div class="space-y-6">
    <SectionHeading
      eyebrow="Common questions"
      title="FAQ"
      description="Answers to questions we hear most."
    />
    <div class="space-y-3">
      {#each faqs as faq (faq.question)}
        <FAQItem {...faq} />
      {/each}
    </div>
  </div>
</section>
