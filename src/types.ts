export interface CountrySummary {
  code: string
  competitionCount: number
  upcomingCount: number
}

export interface Competition {
  id: string
  name: string
  startDate: string
  endDate: string
  city: string
  countryCode: string
  url: string
}

export interface RegionalOrganization {
  name: string
  website: string
  logoUrl: string | null
  countryCode: string
}

export type CompetitionView = 'upcoming' | 'past'

export interface AfricaData {
  generatedAt: string
  source: string
  regionalOrganizationsSource: string
  totalCompetitions: number
  countries: CountrySummary[]
  regionalOrganizations: RegionalOrganization[]
  upcomingCompetitions: Competition[]
  pastCompetitions: Competition[]
}
