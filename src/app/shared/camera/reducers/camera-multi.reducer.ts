
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as CameraActions from '../actions/camera.actions';
import { Camera } from '../models';

export const cameraMultiFeatureKey = 'multi';

export interface State {
  status: EntityStatus;
  cameras?: Camera[];
  sourceId?: string | null;
  error?: unknown;
  page?: number;
  totalCount?: number;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  cameras: [],
  sourceId: null,
  error: null,
  page: 1,
  totalCount: 0,
};

export const reducer = createReducer(
  initialState,
  on(CameraActions.loadCameras, (state, { sourceId }): State => ({ ...state, sourceId, error: undefined, status: EntityStatus.Pending })),
  on(CameraActions.saveCameras, (state, { page, totalCount, cameras, status, error }): State => {
    return {
      ...state,
      cameras: page > 1
            ? [...(state?.cameras ?? []), ...(cameras ?? [])]
            : cameras,
      page,
      totalCount,
      status,
      error,
    }
  })
);
