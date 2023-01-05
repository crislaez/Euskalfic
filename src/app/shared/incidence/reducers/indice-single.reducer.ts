
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as IncidenceActions from '../actions/incidence.actions';
import { Incidence } from '../models';

export const incidenceSingleFeatureKey = 'single';

export interface State {
  [key: string]:{
    incidence: Incidence;
    status: EntityStatus;
    error?: unknown;
    sourceId?: number
  }
}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(IncidenceActions.loadIncidence, (state, { incidenceId, sourceId }): State => ({
    ...state,
    [incidenceId]:{
      ...(state?.[incidenceId] ?? {}),
      error: undefined,
      status: EntityStatus.Pending,
      sourceId
    }
  })),
  on(IncidenceActions.saveIncidence, (state, { incidence, status, error }): State => {
    const { incidenceId = 0 } = incidence || {}
    return {
      ...state,
      [incidenceId]:{
        ...(state?.[incidenceId] ?? {}),
        incidence,
        error,
        status
      }
    }
  })
);
