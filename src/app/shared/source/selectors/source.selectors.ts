
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sourceMultiFeatureKey } from '../reducers/source-multi.reducer';
import { combineFeatureKey, CombineState } from '../reducers';

export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

/* === MULTI === */
export const selectMultiState = createSelector(
  selectCombineState,
  (state) => state[sourceMultiFeatureKey]
)

export const selectStatus = createSelector(
  selectMultiState,
  (state) => state?.status
);

export const selectSources = createSelector(
  selectMultiState,
  (state) => state?.sources
);

export const selectErrors = createSelector(
  selectMultiState,
  (state) => state?.error
);
