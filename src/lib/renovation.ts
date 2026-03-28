export type Tier = 'budget' | 'midrange' | 'premium' | 'luxury'

export interface ProjectTierEstimate {
  low: number
  high: number
  perSqft: number
}

export interface BreakdownWeight {
  label: string
  weight: number
}

export interface ProjectDefinition {
  label: string
  roi: string
  summary: string
  breakdownWeights: BreakdownWeight[]
  tiers: Record<Tier, ProjectTierEstimate>
}

export interface RoomDefinition {
  label: string
  projects: Record<string, ProjectDefinition>
}

export const rooms: Record<string, RoomDefinition> = {
  kitchen: {
    label: 'Kitchen',
    projects: {
      full_remodel: {
        label: 'Full remodel',
        roi: 'Typical resale recapture: 55% to 70%',
        summary: 'Layout, cabinetry, countertops, flooring, and fixtures.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.38 },
          { label: 'Cabinets', weight: 0.24 },
          { label: 'Countertops', weight: 0.13 },
          { label: 'Appliances', weight: 0.16 },
          { label: 'Permits and misc', weight: 0.09 },
        ],
        tiers: {
          budget: { low: 10000, high: 20000, perSqft: 50 },
          midrange: { low: 18000, high: 35000, perSqft: 90 },
          premium: { low: 35000, high: 65000, perSqft: 175 },
          luxury: { low: 65000, high: 150000, perSqft: 400 },
        },
      },
      cabinet_refacing: {
        label: 'Cabinet refacing',
        roi: 'Typical resale recapture: 65% to 80%',
        summary: 'Refresh cabinet fronts and hardware without full replacement.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.4 },
          { label: 'Materials', weight: 0.36 },
          { label: 'Hardware', weight: 0.14 },
          { label: 'Misc', weight: 0.1 },
        ],
        tiers: {
          budget: { low: 3500, high: 7000, perSqft: 20 },
          midrange: { low: 7000, high: 13000, perSqft: 35 },
          premium: { low: 13000, high: 22000, perSqft: 60 },
          luxury: { low: 22000, high: 35000, perSqft: 95 },
        },
      },
      countertops_only: {
        label: 'Countertops only',
        roi: 'Typical resale recapture: 60% to 75%',
        summary: 'Countertop replacement and edge/finish upgrades.',
        breakdownWeights: [
          { label: 'Fabrication', weight: 0.42 },
          { label: 'Materials', weight: 0.44 },
          { label: 'Labor', weight: 0.14 },
        ],
        tiers: {
          budget: { low: 2500, high: 5000, perSqft: 15 },
          midrange: { low: 5000, high: 9500, perSqft: 28 },
          premium: { low: 9500, high: 17000, perSqft: 48 },
          luxury: { low: 17000, high: 30000, perSqft: 86 },
        },
      },
    },
  },
  bathroom: {
    label: 'Bathroom',
    projects: {
      full_remodel: {
        label: 'Full remodel',
        roi: 'Typical resale recapture: 55% to 70%',
        summary: 'Shower/tub, vanity, tile, fixtures, and ventilation updates.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.42 },
          { label: 'Tile and surfaces', weight: 0.22 },
          { label: 'Fixtures', weight: 0.17 },
          { label: 'Vanity and storage', weight: 0.11 },
          { label: 'Permits and misc', weight: 0.08 },
        ],
        tiers: {
          budget: { low: 7000, high: 14000, perSqft: 70 },
          midrange: { low: 14000, high: 28000, perSqft: 140 },
          premium: { low: 28000, high: 52000, perSqft: 260 },
          luxury: { low: 52000, high: 90000, perSqft: 450 },
        },
      },
      shower_upgrade: {
        label: 'Shower upgrade',
        roi: 'Typical resale recapture: 55% to 65%',
        summary: 'Replace or retile shower and update glass, valves, and hardware.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.46 },
          { label: 'Tile and waterproofing', weight: 0.3 },
          { label: 'Fixtures and glass', weight: 0.24 },
        ],
        tiers: {
          budget: { low: 4500, high: 9000, perSqft: 52 },
          midrange: { low: 9000, high: 17000, perSqft: 96 },
          premium: { low: 17000, high: 30000, perSqft: 165 },
          luxury: { low: 30000, high: 50000, perSqft: 275 },
        },
      },
    },
  },
  bedroom: {
    label: 'Bedroom',
    projects: {
      refresh: {
        label: 'Refresh and finish update',
        roi: 'Typical resale recapture: 60% to 75%',
        summary: 'Paint, trim, flooring, closet updates, and lighting changes.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.34 },
          { label: 'Flooring', weight: 0.32 },
          { label: 'Paint and trim', weight: 0.2 },
          { label: 'Lighting and misc', weight: 0.14 },
        ],
        tiers: {
          budget: { low: 2500, high: 7000, perSqft: 18 },
          midrange: { low: 7000, high: 14000, perSqft: 36 },
          premium: { low: 14000, high: 24000, perSqft: 65 },
          luxury: { low: 24000, high: 42000, perSqft: 110 },
        },
      },
    },
  },
  living_room: {
    label: 'Living room',
    projects: {
      refresh: {
        label: 'Refresh and finish update',
        roi: 'Typical resale recapture: 55% to 70%',
        summary: 'Flooring, paint, trim, built-ins, and lighting improvements.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.36 },
          { label: 'Flooring', weight: 0.31 },
          { label: 'Paint and trim', weight: 0.19 },
          { label: 'Lighting and misc', weight: 0.14 },
        ],
        tiers: {
          budget: { low: 3000, high: 8000, perSqft: 16 },
          midrange: { low: 8000, high: 16000, perSqft: 34 },
          premium: { low: 16000, high: 29000, perSqft: 62 },
          luxury: { low: 29000, high: 50000, perSqft: 105 },
        },
      },
    },
  },
  basement: {
    label: 'Basement',
    projects: {
      finish: {
        label: 'Basement finishing',
        roi: 'Typical resale recapture: 60% to 75%',
        summary: 'Insulation, framing, drywall, flooring, and lighting for livable space.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.41 },
          { label: 'Framing and drywall', weight: 0.24 },
          { label: 'Flooring', weight: 0.14 },
          { label: 'Electrical and lighting', weight: 0.13 },
          { label: 'Permits and misc', weight: 0.08 },
        ],
        tiers: {
          budget: { low: 12000, high: 28000, perSqft: 35 },
          midrange: { low: 28000, high: 55000, perSqft: 68 },
          premium: { low: 55000, high: 95000, perSqft: 118 },
          luxury: { low: 95000, high: 160000, perSqft: 195 },
        },
      },
    },
  },
  deck_patio: {
    label: 'Deck or patio',
    projects: {
      new_build: {
        label: 'New build',
        roi: 'Typical resale recapture: 55% to 75%',
        summary: 'New outdoor living area with railing, steps, and finish options.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.37 },
          { label: 'Materials', weight: 0.43 },
          { label: 'Site prep', weight: 0.12 },
          { label: 'Permits and misc', weight: 0.08 },
        ],
        tiers: {
          budget: { low: 6000, high: 15000, perSqft: 24 },
          midrange: { low: 15000, high: 32000, perSqft: 52 },
          premium: { low: 32000, high: 58000, perSqft: 92 },
          luxury: { low: 58000, high: 95000, perSqft: 150 },
        },
      },
    },
  },
  full_house: {
    label: 'Full house',
    projects: {
      whole_home_update: {
        label: 'Whole home update',
        roi: 'Typical resale recapture: 50% to 70%',
        summary: 'Multi-room refresh including core systems, finishes, and staging-ready updates.',
        breakdownWeights: [
          { label: 'Labor', weight: 0.4 },
          { label: 'Materials', weight: 0.31 },
          { label: 'System upgrades', weight: 0.17 },
          { label: 'Permits and misc', weight: 0.12 },
        ],
        tiers: {
          budget: { low: 40000, high: 90000, perSqft: 42 },
          midrange: { low: 90000, high: 180000, perSqft: 84 },
          premium: { low: 180000, high: 320000, perSqft: 148 },
          luxury: { low: 320000, high: 560000, perSqft: 255 },
        },
      },
    },
  },
}

export interface RenovationInputs {
  roomKey: string
  projectKey: string
  tier: Tier
  squareFeet: number
}

export interface EstimateBreakdownRow {
  label: string
  low: number
  high: number
}

export interface RenovationEstimate {
  projectLabel: string
  roomLabel: string
  tierLabel: string
  low: number
  high: number
  roi: string
  summary: string
  adjustedPerSqftCost: number
  breakdown: EstimateBreakdownRow[]
}

const tierLabels: Record<Tier, string> = {
  budget: 'Budget',
  midrange: 'Mid-range',
  premium: 'Premium',
  luxury: 'Luxury',
}

export function getTierLabel(tier: Tier): string {
  return tierLabels[tier]
}

export function getRoomOptions() {
  return Object.entries(rooms).map(([value, room]) => ({ value, label: room.label }))
}

export function getProjectOptions(roomKey: string) {
  const room = rooms[roomKey]
  if (!room) return []
  return Object.entries(room.projects).map(([value, project]) => ({ value, label: project.label }))
}

export function getDefaultProjectKey(roomKey: string): string {
  const options = getProjectOptions(roomKey)
  return options.length ? options[0].value : ''
}

export function calculateRenovationEstimate(inputs: RenovationInputs): RenovationEstimate | null {
  const room = rooms[inputs.roomKey]
  if (!room) return null

  const project = room.projects[inputs.projectKey]
  if (!project) return null

  const tier = project.tiers[inputs.tier]
  const sizeFactor = Math.max(0.65, Math.min(1.75, inputs.squareFeet / 200))
  const sizeAdjustedPerSqft = tier.perSqft * sizeFactor

  const floorBySqft = Math.round(inputs.squareFeet * sizeAdjustedPerSqft * 0.72)
  const ceilingBySqft = Math.round(inputs.squareFeet * sizeAdjustedPerSqft * 1.24)

  const low = Math.max(tier.low, floorBySqft)
  const high = Math.max(low + 500, Math.max(tier.high, ceilingBySqft))

  const breakdown = project.breakdownWeights.map((item) => ({
    label: item.label,
    low: Math.round(low * item.weight),
    high: Math.round(high * item.weight),
  }))

  return {
    projectLabel: project.label,
    roomLabel: room.label,
    tierLabel: tierLabels[inputs.tier],
    low,
    high,
    roi: project.roi,
    summary: project.summary,
    adjustedPerSqftCost: Math.round(sizeAdjustedPerSqft),
    breakdown,
  }
}
