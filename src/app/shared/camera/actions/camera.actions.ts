import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createAction, props } from '@ngrx/store';
import { Camera } from '../models';


export const loadCameras = createAction(
  '[Camera] Load Cameras',
  props<{ page:number, sourceId: string | null }>()
);

export const saveCameras = createAction(
  '[Camera] Save Cameras',
  props<{ cameras: Camera[], page: number, totalCount: number, error:unknown, status:EntityStatus }>()
);


export const loadCamera = createAction(
  '[Camera] Load Camera',
  props<{ cameraId: number, sourceId: number }>()
);

export const saveCamera = createAction(
  '[Camera] Save Camera',
  props<{ camera: Camera, error:unknown, status:EntityStatus }>()
);
