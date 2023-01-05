import { createFeatureSelector, createSelector } from '@ngrx/store';
import { incidenceMultiFeatureKey } from '../reducers/incidence-multi.reducer';
import { incidenceSingleFeatureKey } from '../reducers/indice-single.reducer';
import { combineFeatureKey, CombineState } from '../reducers';


export const selectCombineState = createFeatureSelector<CombineState>(combineFeatureKey);

/* === MULTI === */
export const selectMultiState = createSelector(
  selectCombineState,
  (state) => state[incidenceMultiFeatureKey]
);


export const selectStatus = createSelector(
  selectMultiState,
  (state) => state?.status
);

export const selectIncidences = createSelector(
  selectMultiState,
  (state) => state?.incidences
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
  (state) => state?.[incidenceSingleFeatureKey] || {}
);


export const selectSingleIncidence = (incidenceId: number) => createSelector(
  selectSingleState,
  (state) => state?.[incidenceId]?.incidence
)

export const selecSingletStatus = (incidenceId: number) => createSelector(
  selectSingleState,
  (state) => state?.[incidenceId]?.status
);

export const selectSingleErrors = (incidenceId: number) => createSelector(
  selectSingleState,
  (state) => state?.[incidenceId]?.error
);
