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

export type CompetitionView = 'upcoming' | 'past'

export interface AfricaData {
  generatedAt: string
  source: string
  totalCompetitions: number
  countries: CountrySummary[]
  upcomingCompetitions: Competition[]
  pastCompetitions: Competition[]
}
