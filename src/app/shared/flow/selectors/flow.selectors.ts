
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { flowMultiFeatureKey } from '../reducers/flow-multi.reducer';
import { flowSingleFeatureKey } from '../reducers/flow-single.reducer';
import { combineFeatureKey, CombineState } from '../reducers';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

/* === MULTI === */
export const selectMultiState = createSelector(
  selectCombineState,
  (state) => state[flowMultiFeatureKey]
)

export const selectStatus = createSelector(
  selectMultiState,
  (state) => state?.status
);

export const selectFlows = createSelector(
  selectMultiState,
  (state) => state?.flows
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
  (state) => state?.[flowSingleFeatureKey] || {}
);

export const selectSingleFlow = (cameraId: number) => createSelector(
  selectSingleState,
  (state) => state?.[cameraId]?.flow
)

export const selecSingletStatus = (cameraId: number) => createSelector(
  selectSingleState,
  (state) => state?.[cameraId]?.status
);

export const selectSingleErrors = (cameraId: number) => createSelector(
  selectSingleState,
  (state) => state?.[cameraId]?.error
);
