
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cameraMultiFeatureKey } from '../reducers/camera-multi.reducer';
import { cameraSingleFeatureKey } from '../reducers/camera-single.reducer';
import { combineFeatureKey, CombineState } from '../reducers';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

/* === MULTI === */
export const selectMultiState = createSelector(
  selectCombineState,
  (state) => state[cameraMultiFeatureKey]
)

export const selectStatus = createSelector(
  selectMultiState,
  (state) => state?.status
);

export const selectCameras = createSelector(
  selectMultiState,
  (state) => state?.cameras
);

export const selectPage = createSelector(
  selectMultiState,
  (state) => state?.page
);

export const selectFilterSourceId = createSelector(
  selectMultiState,
  (state) => state?.sourceId
);

export const selectTotal = createSelector(
  selectMultiState,
  (state) => state?.totalCount
);

export const selectErrors = createSelector(
  selectMultiState,
  (state) => state?.error
);



/* === SINGLE === */
export const selectSingleState = createSelector(
  selectCombineState,
  (state) => state?.[cameraSingleFeatureKey] || {}
);

export const selectSingleCamera = (cameraId: number) => createSelector(
  selectSingleState,
  (state) => state?.[cameraId]?.camera
)

export const selecSingletStatus = (cameraId: number) => createSelector(
  selectSingleState,
  (state) => state?.[cameraId]?.status
);

export const selectSingleErrors = (cameraId: number) => createSelector(
  selectSingleState,
  (state) => state?.[cameraId]?.error
);
