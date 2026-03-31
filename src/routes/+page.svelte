<script lang="ts">
  import { z } from 'zod'
  import { affiliateCards, explainerSections, faqs, siteMeta } from '$lib/content/site'
  import ChoiceField from '$lib/components/ChoiceField.svelte'
  import ControlPanel from '$lib/components/ControlPanel.svelte'
  import ResultCard from '$lib/components/ResultCard.svelte'
  import SectionHeading from '$lib/components/SectionHeading.svelte'
  import HeroSection from '$lib/components/HeroSection.svelte'
  import QuickSnapshotCard from '$lib/components/QuickSnapshotCard.svelte'
  import RecommendationsSection from '$lib/components/RecommendationsSection.svelte'
  import GuideSection from '$lib/components/GuideSection.svelte'
  import InputRange from '$lib/components/elements/InputRange.svelte'
  import InputNumberWithSteppers from '$lib/components/elements/InputNumberWithSteppers.svelte'
  import {
    calculateRenovationEstimate,
    getDefaultProjectKey,
    getProjectOptions,
    getRoomOptions,
    getTierLabel,
    type RenovationInputs,
    type Tier,
  } from '$lib/renovation'

  const inputSchema = z.object({
    roomKey: z.string().min(1, 'Please select a room.'),
    projectKey: z.string().min(1, 'Please select a project type.'),
    tier: z.union([z.literal('budget'), z.literal('midrange'), z.literal('premium'), z.literal('luxury')]),
    squareFeet: z.number().min(40, 'Square footage must be at least 40.').max(8000, 'Square footage must be 8,000 or below.'),
  })

  type FieldErrors = Partial<Record<keyof RenovationInputs, string>>

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const wholeNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

  const tierOptions: Array<{ value: Tier; label: string }> = [
    { value: 'budget', label: 'Budget' },
    { value: 'midrange', label: 'Mid-range' },
    { value: 'premium', label: 'Premium' },
    { value: 'luxury', label: 'Luxury' },
  ]

  const defaultRoomKey = 'kitchen'

  let inputs: RenovationInputs = {
    roomKey: defaultRoomKey,
    projectKey: getDefaultProjectKey(defaultRoomKey),
    tier: 'midrange',
    squareFeet: 200,
  }

  const roomOptions = getRoomOptions()

  $: projectOptions = getProjectOptions(inputs.roomKey)
  $: validation = inputSchema.safeParse(inputs)
  $: fieldErrors = collectErrors(validation.success ? null : validation.error)
  $: estimate = validation.success ? calculateRenovationEstimate(inputs) : null

  function collectErrors(error: z.ZodError<RenovationInputs> | null): FieldErrors {
    if (!error) {
      return {}
    }

    const next: FieldErrors = {}
    for (const issue of error.issues) {
      const key = issue.path[0] as keyof RenovationInputs | undefined
      if (key && !next[key]) {
        next[key] = issue.message
      }
    }
    return next
  }

  function setSquareFeet(value: number) {
    inputs = {
      ...inputs,
      squareFeet: Number.isFinite(value) ? value : inputs.squareFeet,
    }
  }

  function nudgeSquareFeet(direction: -1 | 1) {
    const min = 40
    const max = 8000
    const step = 10
    const next = Math.min(max, Math.max(min, inputs.squareFeet + direction * step))
    setSquareFeet(next)
  }

  function selectRoom(roomKey: string) {
    inputs = {
      ...inputs,
      roomKey,
      projectKey: getDefaultProjectKey(roomKey),
    }
  }

  async function saveEstimateSummary() {
    if (!estimate) return

    const summary = [
      `${estimate.roomLabel} - ${estimate.projectLabel}`,
      `${estimate.tierLabel} quality`,
      `Size: ${wholeNumber.format(inputs.squareFeet)} sq ft`,
      `Estimated range: ${currency.format(estimate.low)} to ${currency.format(estimate.high)}`,
      `Cost intensity: ${currency.format(estimate.adjustedPerSqftCost)} / sq ft`,
      `ROI: ${estimate.roi}`,
    ].join('\n')

    await navigator.clipboard.writeText(summary)
  }
</script>

<svelte:head>
  <title>Home Renovation Calculator | Quontly</title>
  <meta
    name="description"
    content="Estimate home renovation costs by room, project type, quality tier, and square footage."
  />
</svelte:head>

<main>
  <section class="container mx-auto flex max-w-7xl flex-col gap-10 px-5 py-10 lg:py-16">
    <HeroSection
      eyebrow="Home Renovation Cost Estimator"
      title="Plan renovation costs with practical ranges you can actually budget."
      subtitle="Choose your room, project type, quality tier, and square footage to estimate a realistic low-to-high budget before you request contractor quotes."
      ctaHref="#calculator"
      ctaLabel="Estimate my project"
      secondaryCtaHref="#how-it-works"
      secondaryCtaLabel="See how costs are calculated"
      stats={[
        { label: 'Estimate style', value: 'Low to high range' },
        { label: 'Quality tiers', value: 'Budget to luxury' },
        { label: 'Planning output', value: 'Actionable budget summary' },
      ]}
    >
    </HeroSection>

    <section id="calculator">
      <SectionHeading
        eyebrow="Estimator"
        title="Set your project profile"
        description="Use the controls to model project scope and quality. The estimator updates your budget range instantly."
      />

      <div class="mt-10 flex flex-col gap-8 xl:flex-row xl:items-start">
        <div class="w-full space-y-6 xl:basis-[56%] xl:flex-1">
          <ControlPanel
            eyebrow="Step 1"
            title="Choose room and project"
            description="Start with the room you want to renovate, then select the project type that best matches your scope."
          >
            <ChoiceField
              label="Room"
              hint="Pick one"
              value={inputs.roomKey}
              options={roomOptions}
              onChange={selectRoom}
              columns="3"
            />

            {#if projectOptions.length > 1}
              <label class="form-control gap-2">
                <div class="flex items-center justify-between gap-3">
                  <span class="label-text font-semibold text-base-content">Project type</span>
                  <span class="text-xs text-base-content/60">Room-specific options</span>
                </div>
                <select
                  class="select select-bordered w-full bg-base-100"
                  bind:value={inputs.projectKey}
                >
                  {#each projectOptions as option (option.value)}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
                {#if fieldErrors.projectKey}
                  <span class="text-xs text-error">{fieldErrors.projectKey}</span>
                {/if}
              </label>
            {/if}
          </ControlPanel>

          <ControlPanel
            eyebrow="Step 2"
            title="Set quality and size"
            description="Choose your finish level and enter square footage to customize the estimated range."
          >
            <ChoiceField
              label="Quality tier"
              hint="Affects both material and labor assumptions"
              value={inputs.tier}
              options={tierOptions}
              onChange={(value) => (inputs = { ...inputs, tier: value as Tier })}
              columns="4"
            />

            <div class="space-y-3">
              <div class="flex items-center justify-between gap-3">
                <span class="label-text font-semibold text-base-content">Square footage</span>
                <span class="text-xs text-base-content/60">{wholeNumber.format(inputs.squareFeet)} sq ft</span>
              </div>
              <InputRange min={40} max={8000} step={10} value={inputs.squareFeet} onChange={setSquareFeet} />
              <InputNumberWithSteppers
                classes="text-center"
                min={40}
                max={8000}
                step={10}
                value={inputs.squareFeet}
                endLabel="sq ft"
                onInputChange={setSquareFeet}
                onStepperDownClick={() => nudgeSquareFeet(-1)}
                onStepperUpClick={() => nudgeSquareFeet(1)}
              />
              {#if fieldErrors.squareFeet}
                <p class="text-xs text-error">{fieldErrors.squareFeet}</p>
              {/if}
            </div>
          </ControlPanel>
        </div>

        <div class="w-full space-y-6 xl:sticky xl:top-24 xl:basis-[44%] xl:self-start">
          <div class="flex flex-col gap-2">
            
            <ResultCard
              tone="primary"
              label="Estimated cost range"
              value={estimate ? `${currency.format(estimate.low)} - ${currency.format(estimate.high)}` : '$0 - $0'}
              detail={estimate ? `${estimate.roomLabel} · ${estimate.projectLabel}` : 'Select room and project'}
            />

            <div class="flex gap-2">
              <div class="w-full">
                <ResultCard
                  label="Cost intensity"
                  value={estimate ? `${currency.format(estimate.adjustedPerSqftCost)} / sq ft` : '$0 / sq ft'}
                  detail={estimate ? `${estimate.tierLabel} assumptions` : 'Choose quality tier'}
                />
              </div>
              <div class="w-full">
                <ResultCard
                  label="ROI context"
                  value={estimate ? estimate.roi.replace('Typical resale recapture: ', '') : 'N/A'}
                  detail="Typical resale range"
                />
              </div>
            </div>

            <ResultCard
              label="Scope"
              value={estimate ? estimate.summary : 'Select options'}
              detail={`${wholeNumber.format(inputs.squareFeet)} sq ft`}
              valueClassName="text-[clamp(1rem,1.8vw,1.45rem)] leading-snug"
            />

          </div>

          {#if estimate}
            <div class="rounded-box border border-base-300 bg-base-100/90 p-4 text-sm leading-6 text-base-content/75">
              <p class="font-semibold text-base-content">Budget interpretation</p>
              <p>
                A {estimate.tierLabel.toLowerCase()} {estimate.projectLabel.toLowerCase()} in a {estimate.roomLabel.toLowerCase()} of {wholeNumber.format(inputs.squareFeet)} sq ft typically lands between {currency.format(estimate.low)} and {currency.format(estimate.high)}. Add a 10% to 20% contingency for unknowns such as permit updates, hidden repairs, or timeline changes.
              </p>
            </div>
          {/if}

          <div class="flex flex-wrap gap-3">
            <a class="btn btn-primary" href="#offers">Get quotes</a>
          </div>
        </div>
      </div>
    </section>

    {#if siteMeta.adsEnabled}
      <section class="rounded-box border border-base-300 bg-base-100/80 p-6 text-center text-sm text-base-content/70">
        Sponsored placement may appear here.
      </section>
    {/if}

    <section id="offers" class="space-y-8">
      <div>
        <SectionHeading
          eyebrow="Recommendations"
          title="Compare quotes and tools for your renovation"
          description="These resources can help you validate costs, source materials, and plan your next step."
        />
        <div class="alert mt-8 border border-primary/20 bg-primary/8 text-sm text-base-content/85">
          <span>{siteMeta.disclosure}</span>
        </div>
      </div>
      <RecommendationsSection cards={affiliateCards} />
    </section>

    <GuideSection {explainerSections} {faqs} />

  </section>
</main>