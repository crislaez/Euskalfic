
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as CameraActions from '../actions/camera.actions';
import { Camera } from '../models';

export const cameraSingleFeatureKey = 'single';

export interface State {
  [key: string]:{
    camera: Camera;
    status: EntityStatus;
    error?: unknown;
    sourceId?: number
  }
}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CameraActions.loadCamera, (state, { cameraId, sourceId }): State => ({
    ...state,
    [cameraId]:{
      ...(state?.[cameraId] ?? {}),
      error: undefined,
      status: EntityStatus.Pending,
      sourceId
    }
  })),
  on(CameraActions.saveCamera, (state, { camera, status, error }): State => {
    const { cameraId = 0 } = camera || {}
    return {
      ...state,
      [cameraId]:{
        ...(state?.[cameraId] ?? {}),
        camera,
        error,
        status
      }
    }
  })
);
