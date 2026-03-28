import { useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
import clsx from 'clsx'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { z } from 'zod'
import { affiliateCards, explainerSections, faqs, legalPageCopy, siteMeta } from './content/site'
import {
  calculateRenovationEstimate,
  getDefaultProjectKey,
  getProjectOptions,
  getRoomOptions,
  getTierLabel,
  type RenovationInputs,
  type Tier,
} from './lib/renovation'

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

const defaultInputs: RenovationInputs = {
  roomKey: defaultRoomKey,
  projectKey: getDefaultProjectKey(defaultRoomKey),
  tier: 'midrange',
  squareFeet: 200,
}

function collectErrors(error: z.ZodError<RenovationInputs> | null): FieldErrors {
  if (!error) return {}
  const next: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof RenovationInputs | undefined
    if (key && !next[key]) {
      next[key] = issue.message
    }
  }
  return next
}

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<LegalPage page={legalPageCopy.about} eyebrow="Methodology" />} />
        <Route path="/privacy" element={<LegalPage page={legalPageCopy.privacy} eyebrow="Privacy" />} />
        <Route path="/terms" element={<LegalPage page={legalPageCopy.terms} eyebrow="Terms" />} />
        <Route path="/disclosure" element={<LegalPage page={legalPageCopy.disclosure} eyebrow="Disclosure" />} />
      </Routes>
    </div>
  )
}

function HomePage() {
  const [inputs, setInputs] = useState<RenovationInputs>(defaultInputs)

  const validation = useMemo(() => inputSchema.safeParse(inputs), [inputs])
  const fieldErrors = useMemo(() => collectErrors(validation.success ? null : validation.error), [validation])
  const estimate = useMemo(
    () => (validation.success ? calculateRenovationEstimate(inputs) : null),
    [inputs, validation],
  )

  const roomOptions = getRoomOptions()
  const projectOptions = getProjectOptions(inputs.roomKey)

  const setSquareFeetField = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value)
    setInputs((current) => ({
      ...current,
      squareFeet: Number.isFinite(parsed) ? parsed : current.squareFeet,
    }))
  }

  const selectRoom = (roomKey: string) => {
    setInputs((current) => ({
      ...current,
      roomKey,
      projectKey: getDefaultProjectKey(roomKey),
    }))
  }

  const saveEstimateSummary = async () => {
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

  const breakdownChartData = estimate
    ? estimate.breakdown.map((item) => ({
        name: item.label,
        Low: item.low,
        High: item.high,
      }))
    : []

  return (
    <>
      <AppHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-base-300 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.2),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(234,88,12,0.16),transparent_30%),linear-gradient(180deg,#fcfffd_0%,#f8fafc_58%,#eefdf9_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-6 lg:py-24">
            <div className="space-y-6">
              <div className="badge badge-outline rounded-[0.18rem] border-primary/35 bg-white/75 px-4 py-3 text-primary">Home Renovation Cost Estimator</div>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl">
                  Plan renovation costs with practical ranges you can actually budget.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Choose your room, project type, quality tier, and square footage to estimate a realistic low-to-high budget before you request contractor quotes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="btn btn-primary rounded-[0.2rem] btn-lg" href="#calculator">
                  Estimate my project
                </a>
                <a className="btn btn-ghost rounded-[0.2rem] btn-lg text-slate-700" href="#how-it-works">
                  See how costs are calculated
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <TrustPoint label="Estimate style" value="Low to high range" />
                <TrustPoint label="Quality tiers" value="Budget to luxury" />
                <TrustPoint label="Planning output" value="Breakdown by category" />
              </div>
            </div>

            <div className="card border border-primary/15 rounded-[0.24rem] bg-white/92 shadow-xl shadow-primary/10">
              <div className="card-body gap-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Quick snapshot</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">Estimated range</p>
                    <p className="text-[clamp(1.9rem,4.8vw,2.35rem)] leading-tight font-semibold text-slate-900 break-words">
                      {estimate ? `${currency.format(estimate.low)} - ${currency.format(estimate.high)}` : '$0 - $0'}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <SnapshotCard label="Tier" value={estimate ? estimate.tierLabel : getTierLabel(inputs.tier)} />
                    <SnapshotCard label="Size" value={`${wholeNumber.format(inputs.squareFeet)} sq ft`} />
                  </div>
                </div>
                <p className="rounded-[0.2rem] bg-base-200 p-4 text-sm leading-6 text-slate-600">
                  Planning estimate only. Confirm scope, permits, and local labor pricing with licensed professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {siteMeta.adsEnabled ? (
          <section className="border-b border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
              <AdSlot title="Sponsored" description="Additional renovation offers may appear here." />
            </div>
          </section>
        ) : null}

        <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <SectionHeading
            eyebrow="Estimator"
            title="Set your project profile"
            description="Use the controls to model project scope and quality. The estimator updates your budget range and cost breakdown instantly."
          />

          <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
            <div className="space-y-6">
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

                <label className="form-control gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-text font-semibold text-slate-800">Project type</span>
                    <span className="text-xs text-slate-500">Room-specific options</span>
                  </div>
                  <select
                    className="select rounded-[0.2rem] select-bordered w-full bg-base-100"
                    value={inputs.projectKey}
                    onChange={(event) =>
                      setInputs((current) => ({
                        ...current,
                        projectKey: event.target.value,
                      }))
                    }
                  >
                    {projectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.projectKey ? <span className="text-xs text-error">{fieldErrors.projectKey}</span> : null}
                </label>
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
                  onChange={(value) => setInputs((current) => ({ ...current, tier: value as Tier }))}
                  columns="4"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-text font-semibold text-slate-800">Square footage</span>
                    <span className="text-xs text-slate-500">{wholeNumber.format(inputs.squareFeet)} sq ft</span>
                  </div>
                  <input
                    type="range"
                    className="range range-primary"
                    min={40}
                    max={8000}
                    step={10}
                    value={inputs.squareFeet}
                    onChange={setSquareFeetField}
                  />
                  <input
                    type="number"
                    className="input rounded-[0.2rem] input-bordered w-full bg-base-100"
                    min={40}
                    max={8000}
                    step={10}
                    value={inputs.squareFeet}
                    onChange={setSquareFeetField}
                  />
                  {fieldErrors.squareFeet ? <p className="text-xs text-error">{fieldErrors.squareFeet}</p> : null}
                </div>
              </ControlPanel>
            </div>

            <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  tone="primary"
                  label="Estimated cost range"
                  value={estimate ? `${currency.format(estimate.low)} - ${currency.format(estimate.high)}` : '$0 - $0'}
                  detail={estimate ? `${estimate.roomLabel} · ${estimate.projectLabel}` : 'Select room and project'}
                />
                <ResultCard
                  label="Cost intensity"
                  value={estimate ? `${currency.format(estimate.adjustedPerSqftCost)} / sq ft` : '$0 / sq ft'}
                  detail={estimate ? `${estimate.tierLabel} assumptions` : 'Choose quality tier'}
                />
                <ResultCard
                  label="ROI context"
                  value={estimate ? estimate.roi.replace('Typical resale recapture: ', '') : 'N/A'}
                  detail="Typical resale range"
                />
                <ResultCard
                  label="Scope"
                  value={estimate ? estimate.summary : 'Select options'}
                  detail={`${wholeNumber.format(inputs.squareFeet)} sq ft`}
                  valueClassName="text-[clamp(1rem,1.8vw,1.45rem)] leading-snug"
                />
              </div>

              <div className="card overflow-hidden rounded-[0.24rem] border border-base-300 bg-base-100 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)]">
                <div className="card-body gap-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Cost breakdown</p>
                      <h2 className="text-2xl font-semibold text-slate-900">Low and high range by category</h2>
                    </div>
                    <p className="text-sm text-slate-500">Use this to stress-test your budget before requesting bids.</p>
                  </div>

                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={breakdownChartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(value) => currency.format(Number(value ?? 0))} />
                        <Bar dataKey="Low" fill="#0d9488" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="High" fill="#ea580c" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {estimate ? (
                    <div className="rounded-[0.2rem] bg-base-200 p-4 text-sm leading-6 text-slate-600">
                      <p className="font-semibold text-slate-800">Budget interpretation</p>
                      <p>
                        A {estimate.tierLabel.toLowerCase()} {estimate.projectLabel.toLowerCase()} in a {estimate.roomLabel.toLowerCase()} of {wholeNumber.format(inputs.squareFeet)} sq ft typically lands between{' '}
                        {currency.format(estimate.low)} and {currency.format(estimate.high)}. Add a 10% to 20% contingency for unknowns such as permit updates, hidden repairs, or timeline changes.
                      </p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-3">
                    <a className="btn btn-primary rounded-[0.2rem]" href="#offers">
                      Get quotes
                    </a>
                    <button className="btn rounded-[0.2rem] btn-outline" type="button" onClick={saveEstimateSummary}>
                      Save estimate summary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {siteMeta.adsEnabled ? (
          <section className="border-y border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
              <AdSlot title="Sponsored" description="Partner offers may appear here." />
            </div>
          </section>
        ) : null}

        <section id="offers" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <SectionHeading
            eyebrow="Recommendations"
            title="Compare quotes and tools for your renovation"
            description="These resources can help you validate costs, source materials, and plan your next step."
          />
          <div className="alert mt-8 rounded-[0.2rem] border border-primary/20 bg-primary/5 text-sm text-slate-700">
            <span>{siteMeta.disclosure}</span>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {affiliateCards.map((card) => (
              <article key={card.title} className="card h-full rounded-[0.24rem] border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body h-full gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
                      <p className="mt-1 text-sm text-slate-500">{card.disclosureTag}</p>
                    </div>
                    <span className="badge badge-outline rounded-[0.18rem] border-primary/40 text-primary">{card.badge}</span>
                  </div>
                  <p className="leading-7 text-slate-600 break-words">{card.description}</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {card.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 bg-primary" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions mt-auto justify-between gap-2">
                    <a className="btn btn-primary rounded-[0.2rem]" href={card.href} target="_blank" rel="noreferrer">
                      {card.ctaLabel}
                    </a>
                    <span className="text-xs text-slate-500 text-right">FTC disclosure applies</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-t border-base-300 bg-base-200/55">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
            <SectionHeading
              eyebrow="Guide"
              title="How this renovation estimator works"
              description="Learn how ranges are generated and how to turn estimates into a practical project budget."
            />

            <div className="mt-10 grid gap-6 xl:grid-cols-3">
              {explainerSections.map((section) => (
                <article key={section.title} className="card rounded-[0.24rem] border border-base-300 bg-base-100 shadow-sm">
                  <div className="card-body gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{section.eyebrow}</p>
                    <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
                    <div className="space-y-4 leading-7 text-slate-600">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="collapse collapse-arrow rounded-[0.2rem] border border-base-300 bg-base-100">
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-semibold text-slate-900">{faq.question}</div>
                  <div className="collapse-content leading-7 text-slate-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  )
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4 lg:px-6">
        <div className="navbar-start gap-3">
          <a href="/" className="flex items-center gap-3 text-slate-900">
            <span className="grid h-11 w-11 place-items-center rounded-[0.2rem] bg-primary text-lg font-bold text-primary-content">HR</span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">QUONTLY</p>
              <p className="text-lg font-semibold text-slate-900">
                Home Renovation <span className="font-mono italic text-primary">Estimator</span>
              </p>
            </div>
          </a>
        </div>
        <div className="navbar-end hidden gap-2 lg:flex">
          <HeaderLink to="/">Estimator</HeaderLink>
          <HeaderLink to="/about">About</HeaderLink>
          <HeaderLink to="/privacy">Privacy</HeaderLink>
          <HeaderLink to="/terms">Terms</HeaderLink>
          <HeaderLink to="/disclosure">Disclosure</HeaderLink>
          <a className="btn btn-primary ml-2 rounded-[0.2rem]" href="#calculator">
            Start now
          </a>
        </div>
      </div>
    </header>
  )
}

function HeaderLink({ to, children }: { to: string; children: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx('btn rounded-[0.2rem] btn-ghost text-sm font-medium', isActive && 'bg-primary/12 text-primary')}
    >
      {children}
    </NavLink>
  )
}

function AppFooter() {
  return (
    <footer className="border-t border-base-300 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">Home Renovation Cost Estimator</p>
          <p className="max-w-2xl leading-7 text-slate-300">
            Educational estimate only. Use this as a planning tool, then validate with licensed professionals and detailed local quotes.
          </p>
          <p className="text-sm text-slate-400">{siteMeta.disclosure}</p>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <NavLink className="link link-hover" to="/about">
            About methodology
          </NavLink>
          <NavLink className="link link-hover" to="/privacy">
            Privacy policy
          </NavLink>
          <NavLink className="link link-hover" to="/terms">
            Terms of use
          </NavLink>
          <NavLink className="link link-hover" to="/disclosure">
            Affiliate disclosure
          </NavLink>
        </div>
      </div>
    </footer>
  )
}

function LegalPage({ eyebrow, page }: { eyebrow: string; page: (typeof legalPageCopy)[keyof typeof legalPageCopy] }) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow={eyebrow} title={page.title} description={page.description} />
        <div className="mt-10 grid gap-6">
          {page.sections.map((section) => (
            <article key={section.heading} className="card rounded-[0.24rem] border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body gap-4">
                <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
                <div className="space-y-4 leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <AppFooter />
    </>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{title}</h2>
      <p className="text-lg leading-8 text-slate-600">{description}</p>
    </div>
  )
}

function AdSlot({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-28 items-center justify-center rounded-[0.2rem] border border-dashed border-base-300 bg-base-200/70 p-6 text-center">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function TrustPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.2rem] border border-white/70 bg-white/78 p-4 shadow-sm backdrop-blur">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function SnapshotCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.2rem] border border-base-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 min-w-0 whitespace-nowrap text-[clamp(1.25rem,3vw,1.95rem)] font-semibold leading-none tracking-tight text-slate-900">{value}</p>
    </div>
  )
}

function ResultCard({
  label,
  value,
  detail,
  tone,
  valueClassName,
}: {
  label: string
  value: string
  detail: string
  tone?: 'primary'
  valueClassName?: string
}) {
  return (
    <article
      className={clsx(
        'card h-full overflow-hidden rounded-[0.2rem] border border-base-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_16px_40px_-32px_rgba(15,23,42,0.45)]',
        tone === 'primary' && 'border-primary/28 bg-[linear-gradient(180deg,rgba(13,148,136,0.14)_0%,rgba(255,255,255,0.98)_100%)]',
      )}
    >
      <div className="card-body relative gap-2">
        <span className={clsx('absolute inset-x-0 top-0 h-1 bg-base-300/60', tone === 'primary' && 'bg-primary/75')} aria-hidden="true" />
        <p className="pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <p className={clsx('text-[clamp(1.05rem,2.1vw,1.65rem)] font-semibold leading-tight text-slate-900 break-words', valueClassName)}>{value}</p>
        <p className="text-sm leading-6 text-slate-600 break-words">{detail}</p>
      </div>
    </article>
  )
}

function ControlPanel({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-[0.24rem] border border-base-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_100%)] p-5 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.38)] ring-1 ring-white/70 md:p-6">
      <div className="absolute right-0 top-0 h-24 w-24 bg-primary/7 blur-2xl" aria-hidden="true" />
      <div className="relative space-y-2 border-b border-base-300/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.7rem]">{title}</h3>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="relative mt-5 space-y-6">{children}</div>
    </section>
  )
}

function ChoiceField<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
  columns,
}: {
  label: string
  hint: string
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
  columns: '3' | '4'
}) {
  const gridClass = columns === '4' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="label-text font-semibold text-slate-800">{label}</span>
        <span className="text-xs text-slate-500">{hint}</span>
      </div>
      <div className={clsx('grid gap-2', gridClass)}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={clsx(
              'btn h-auto min-h-0 w-full rounded-[0.2rem] border-2 px-4 py-3 text-left text-sm font-semibold normal-case shadow-sm transition duration-200 hover:border-primary/40 hover:bg-primary/5',
              value === option.value
                ? 'border-primary bg-primary text-primary-content hover:border-primary'
                : 'border-base-300 bg-base-100 text-slate-700',
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
