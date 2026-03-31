<script lang="ts">
  import type { LegalPageContent } from '../content/site'
  import SectionHeading from '$lib/components/SectionHeading.svelte'

  export let eyebrow: string
  export let page: LegalPageContent
</script>

<main class="mx-auto max-w-5xl px-4 py-16 lg:px-6">
  <SectionHeading eyebrow={eyebrow} title={page.title} description={page.description} />
  <div class="mt-10 flex flex-col gap-6">
    {#each page.sections as section (section.heading)}
      <article class="card border border-base-300 bg-base-100/90 shadow-sm">
        <div class="card-body gap-4">
          <h2 class="text-2xl font-semibold text-base-content">{section.heading}</h2>
          <div class="space-y-4 leading-7 text-base-content/80">
            {#each section.paragraphs as paragraph (paragraph)}
              <p>{paragraph}</p>
            {/each}
          </div>
        </div>
      </article>
    {/each}
  </div>
</main>