export interface Camera {
  cameraId?: number;
  sourceId?: number;
  cameraName?: string;
  latitude?: number;
  longitude?: number;
  road?: string;
  kilometer?: string;
  address?: string;
  urlImage?: string
}


export interface CameraResponse {
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  cameras: Camera[];
}
