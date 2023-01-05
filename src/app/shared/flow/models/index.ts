export interface Flow {
  type?: string;
  properties?: FlowProperty;
  geometry?: FlowGeometry;
}

export interface FlowResponse {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  type?: string;
  features: Flow[];
}

export interface FlowProperty {
  meterId?: string;
  sourceId?: string;
  meterCode?: string;
  system?: string;
  description?: string;
  provinceId?: string;
  province?: string;
  municipalityId?: string;
  municipality?: string;
  latitude?: string;
  longitude?: string;
}

export interface FlowGeometry {
  type?: string;
  coordinates?: number[][]
}
