export interface Incidence {
  autonomousRegion?: string;
  carRegistration?: number;
  cause?: string;
  cityTown?: string;
  direction?: string;
  endDate?: string;
  incidenceDescription?: string;
  incidenceId?: number;
  incidenceLevel?: string;
  incidenceName?: string;
  incidenceType?: string;
  latitude?: number;
  longitude?: number;
  pkEnd?: number;
  pkStart?: number;
  province?: string;
  road?: string;
  sourceId?: number;
  startDate?: string;
}


export interface IncidenceResponse {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  incidences: Incidence[];
}
