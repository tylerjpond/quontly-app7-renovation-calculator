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

export type ScopeType = 'localized' | 'room_wide' | 'whole_home'

export interface ProjectDefinition {
  label: string
  roi: string
  summary: string
  scopeType: ScopeType
  effectiveSqftRatio?: number
  effectiveSqftMin?: number
  effectiveSqftMax?: number
  referenceSqft: number
  sizeMultiplierMin: number
  sizeMultiplierMax: number
  sizeElasticity: number
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
        scopeType: 'room_wide',
        referenceSqft: 180,
        sizeMultiplierMin: 0.9,
        sizeMultiplierMax: 1.28,
        sizeElasticity: 0.18,
        breakdownWeights: [
          { label: 'Labor', weight: 0.38 },
          { label: 'Cabinets', weight: 0.24 },
          { label: 'Countertops', weight: 0.13 },
          { label: 'Appliances', weight: 0.16 },
          { label: 'Permits and misc', weight: 0.09 },
        ],
        tiers: {
          budget: { low: 12000, high: 28000, perSqft: 78 },
          midrange: { low: 22000, high: 45000, perSqft: 150 },
          premium: { low: 45000, high: 75000, perSqft: 240 },
          luxury: { low: 75000, high: 140000, perSqft: 360 },
        },
      },
      cabinet_refacing: {
        label: 'Cabinet refacing',
        roi: 'Typical resale recapture: 65% to 80%',
        summary: 'Refresh cabinet fronts and hardware without full replacement.',
        scopeType: 'localized',
        effectiveSqftRatio: 0.45,
        effectiveSqftMin: 45,
        effectiveSqftMax: 140,
        referenceSqft: 90,
        sizeMultiplierMin: 0.88,
        sizeMultiplierMax: 1.18,
        sizeElasticity: 0.16,
        breakdownWeights: [
          { label: 'Labor', weight: 0.4 },
          { label: 'Materials', weight: 0.36 },
          { label: 'Hardware', weight: 0.14 },
          { label: 'Misc', weight: 0.1 },
        ],
        tiers: {
          budget: { low: 4000, high: 7500, perSqft: 28 },
          midrange: { low: 7500, high: 13500, perSqft: 45 },
          premium: { low: 13500, high: 22000, perSqft: 68 },
          luxury: { low: 22000, high: 32000, perSqft: 96 },
        },
      },
      countertops_only: {
        label: 'Countertops only',
        roi: 'Typical resale recapture: 60% to 75%',
        summary: 'Countertop replacement and edge/finish upgrades.',
        scopeType: 'localized',
        effectiveSqftRatio: 0.2,
        effectiveSqftMin: 18,
        effectiveSqftMax: 65,
        referenceSqft: 32,
        sizeMultiplierMin: 0.9,
        sizeMultiplierMax: 1.15,
        sizeElasticity: 0.12,
        breakdownWeights: [
          { label: 'Fabrication', weight: 0.42 },
          { label: 'Materials', weight: 0.44 },
          { label: 'Labor', weight: 0.14 },
        ],
        tiers: {
          budget: { low: 1800, high: 4500, perSqft: 20 },
          midrange: { low: 4500, high: 8000, perSqft: 35 },
          premium: { low: 8000, high: 14000, perSqft: 58 },
          luxury: { low: 14000, high: 24000, perSqft: 90 },
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
        scopeType: 'room_wide',
        referenceSqft: 80,
        sizeMultiplierMin: 0.92,
        sizeMultiplierMax: 1.25,
        sizeElasticity: 0.16,
        breakdownWeights: [
          { label: 'Labor', weight: 0.42 },
          { label: 'Tile and surfaces', weight: 0.22 },
          { label: 'Fixtures', weight: 0.17 },
          { label: 'Vanity and storage', weight: 0.11 },
          { label: 'Permits and misc', weight: 0.08 },
        ],
        tiers: {
          budget: { low: 8000, high: 14000, perSqft: 120 },
          midrange: { low: 14000, high: 26000, perSqft: 190 },
          premium: { low: 26000, high: 45000, perSqft: 300 },
          luxury: { low: 45000, high: 70000, perSqft: 450 },
        },
      },
      shower_upgrade: {
        label: 'Shower upgrade',
        roi: 'Typical resale recapture: 55% to 65%',
        summary: 'Replace or retile shower and update glass, valves, and hardware.',
        scopeType: 'localized',
        effectiveSqftRatio: 0.3,
        effectiveSqftMin: 28,
        effectiveSqftMax: 72,
        referenceSqft: 48,
        sizeMultiplierMin: 0.9,
        sizeMultiplierMax: 1.14,
        sizeElasticity: 0.14,
        breakdownWeights: [
          { label: 'Labor', weight: 0.46 },
          { label: 'Tile and waterproofing', weight: 0.3 },
          { label: 'Fixtures and glass', weight: 0.24 },
        ],
        tiers: {
          budget: { low: 2000, high: 5000, perSqft: 55 },
          midrange: { low: 5000, high: 9000, perSqft: 92 },
          premium: { low: 9000, high: 15000, perSqft: 150 },
          luxury: { low: 15000, high: 22000, perSqft: 220 },
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
        scopeType: 'room_wide',
        referenceSqft: 160,
        sizeMultiplierMin: 0.9,
        sizeMultiplierMax: 1.2,
        sizeElasticity: 0.14,
        breakdownWeights: [
          { label: 'Labor', weight: 0.34 },
          { label: 'Flooring', weight: 0.32 },
          { label: 'Paint and trim', weight: 0.2 },
          { label: 'Lighting and misc', weight: 0.14 },
        ],
        tiers: {
          budget: { low: 1500, high: 5000, perSqft: 12 },
          midrange: { low: 5000, high: 10000, perSqft: 25 },
          premium: { low: 10000, high: 18000, perSqft: 45 },
          luxury: { low: 18000, high: 30000, perSqft: 75 },
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
        scopeType: 'room_wide',
        referenceSqft: 240,
        sizeMultiplierMin: 0.9,
        sizeMultiplierMax: 1.22,
        sizeElasticity: 0.14,
        breakdownWeights: [
          { label: 'Labor', weight: 0.36 },
          { label: 'Flooring', weight: 0.31 },
          { label: 'Paint and trim', weight: 0.19 },
          { label: 'Lighting and misc', weight: 0.14 },
        ],
        tiers: {
          budget: { low: 2500, high: 7000, perSqft: 14 },
          midrange: { low: 7000, high: 14000, perSqft: 28 },
          premium: { low: 14000, high: 25000, perSqft: 50 },
          luxury: { low: 25000, high: 40000, perSqft: 78 },
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
        scopeType: 'room_wide',
        referenceSqft: 800,
        sizeMultiplierMin: 0.94,
        sizeMultiplierMax: 1.18,
        sizeElasticity: 0.1,
        breakdownWeights: [
          { label: 'Labor', weight: 0.41 },
          { label: 'Framing and drywall', weight: 0.24 },
          { label: 'Flooring', weight: 0.14 },
          { label: 'Electrical and lighting', weight: 0.13 },
          { label: 'Permits and misc', weight: 0.08 },
        ],
        tiers: {
          budget: { low: 12000, high: 24000, perSqft: 25 },
          midrange: { low: 24000, high: 45000, perSqft: 50 },
          premium: { low: 45000, high: 70000, perSqft: 80 },
          luxury: { low: 70000, high: 120000, perSqft: 130 },
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
        scopeType: 'room_wide',
        referenceSqft: 250,
        sizeMultiplierMin: 0.92,
        sizeMultiplierMax: 1.18,
        sizeElasticity: 0.12,
        breakdownWeights: [
          { label: 'Labor', weight: 0.37 },
          { label: 'Materials', weight: 0.43 },
          { label: 'Site prep', weight: 0.12 },
          { label: 'Permits and misc', weight: 0.08 },
        ],
        tiers: {
          budget: { low: 7500, high: 15000, perSqft: 35 },
          midrange: { low: 15000, high: 28000, perSqft: 60 },
          premium: { low: 28000, high: 45000, perSqft: 95 },
          luxury: { low: 45000, high: 70000, perSqft: 140 },
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
        scopeType: 'whole_home',
        referenceSqft: 2200,
        sizeMultiplierMin: 0.94,
        sizeMultiplierMax: 1.14,
        sizeElasticity: 0.08,
        breakdownWeights: [
          { label: 'Labor', weight: 0.4 },
          { label: 'Materials', weight: 0.31 },
          { label: 'System upgrades', weight: 0.17 },
          { label: 'Permits and misc', weight: 0.12 },
        ],
        tiers: {
          budget: { low: 35000, high: 80000, perSqft: 30 },
          midrange: { low: 80000, high: 160000, perSqft: 55 },
          premium: { low: 160000, high: 300000, perSqft: 90 },
          luxury: { low: 300000, high: 500000, perSqft: 150 },
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
  projectAreaSquareFeet: number | null
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
  scopeType: ScopeType
  modeledSquareFeet: number
  suggestedProjectAreaSquareFeet: number | null
  projectAreaCustomized: boolean
  roomSquareFeet: number
  assumptionsNote: string
  adjustedPerSqftCost: number
  breakdown: EstimateBreakdownRow[]
}

export interface ProjectAreaBounds {
  min: number
  max: number
  suggested: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getEffectiveSquareFeet(project: ProjectDefinition, roomSquareFeet: number) {
  if (project.scopeType !== 'localized') {
    return roomSquareFeet
  }

  const ratio = project.effectiveSqftRatio ?? 1
  const scaled = roomSquareFeet * ratio
  const min = project.effectiveSqftMin ?? scaled
  const max = project.effectiveSqftMax ?? scaled
  return clamp(scaled, min, max)
}

function getLocalizedProjectAreaBounds(project: ProjectDefinition, roomSquareFeet: number): ProjectAreaBounds | null {
  if (project.scopeType !== 'localized') {
    return null
  }

  const suggested = getEffectiveSquareFeet(project, roomSquareFeet)
  const normalizedRoomSquareFeet = Math.max(1, Math.round(roomSquareFeet))
  const min = 1
  const max = normalizedRoomSquareFeet

  return {
    min,
    max,
    suggested: clamp(Math.round(suggested), min, max),
  }
}

function getSizeMultiplier(project: ProjectDefinition, effectiveSquareFeet: number) {
  const normalized = Math.max(0.25, effectiveSquareFeet / project.referenceSqft)
  const unbounded = Math.pow(normalized, project.sizeElasticity)
  return clamp(unbounded, project.sizeMultiplierMin, project.sizeMultiplierMax)
}

function getAssumptionsNote(
  project: ProjectDefinition,
  roomSquareFeet: number,
  modeledSquareFeet: number,
  projectAreaCustomized: boolean,
) {
  if (project.scopeType === 'localized') {
    if (projectAreaCustomized) {
      return `Entered square footage is treated as room size. This estimate prices your specified ${Math.round(modeledSquareFeet)} sq ft project area within the ${Math.round(roomSquareFeet)} sq ft room.`
    }

    return `Entered square footage is treated as room size. This estimate prices about ${Math.round(modeledSquareFeet)} sq ft of affected project area, not the full ${Math.round(roomSquareFeet)} sq ft room.`
  }

  if (project.scopeType === 'whole_home') {
    return 'Whole-home projects use a blended cost curve so estimates scale with total home size without assuming every square foot is renovated equally.'
  }

  return 'This estimate treats the entered square footage as the primary project area with a mild size adjustment for complexity and economies of scale.'
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

export function getProjectAreaBounds(roomKey: string, projectKey: string, roomSquareFeet: number): ProjectAreaBounds | null {
  const room = rooms[roomKey]
  if (!room) return null

  const project = room.projects[projectKey]
  if (!project) return null

  return getLocalizedProjectAreaBounds(project, roomSquareFeet)
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
  const projectAreaBounds = getLocalizedProjectAreaBounds(project, inputs.squareFeet)
  const projectAreaCustomized = projectAreaBounds !== null && inputs.projectAreaSquareFeet !== null
  const modeledSquareFeet =
    projectAreaBounds && inputs.projectAreaSquareFeet !== null
      ? clamp(inputs.projectAreaSquareFeet, projectAreaBounds.min, projectAreaBounds.max)
      : getEffectiveSquareFeet(project, inputs.squareFeet)
  const sizeMultiplier = getSizeMultiplier(project, modeledSquareFeet)
  const sizeAdjustedPerSqft = tier.perSqft * sizeMultiplier

  const floorBySqft = Math.round(modeledSquareFeet * sizeAdjustedPerSqft * 0.9)
  const ceilingBySqft = Math.round(modeledSquareFeet * sizeAdjustedPerSqft * 1.18)

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
    scopeType: project.scopeType,
    modeledSquareFeet: Math.round(modeledSquareFeet),
    suggestedProjectAreaSquareFeet: projectAreaBounds?.suggested ?? null,
    projectAreaCustomized,
    roomSquareFeet: inputs.squareFeet,
    assumptionsNote: getAssumptionsNote(project, inputs.squareFeet, modeledSquareFeet, projectAreaCustomized),
    adjustedPerSqftCost: Math.round(sizeAdjustedPerSqft),
    breakdown,
  }
}
