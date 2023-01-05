
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as IncidenceActions from '../actions/incidence.actions';
import { Incidence } from '../models';

export const incidenceMultiFeatureKey = 'multi';

export interface State {
  status: EntityStatus;
  incidences?: Incidence[];
  sourceId?: string | null;
  error?: unknown;
  page?: number;
  totalCount?: number;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  incidences: [],
  sourceId: null,
  error: null,
  page: 1,
  totalCount: 0,
};

export const reducer = createReducer(
  initialState,
  on(IncidenceActions.loadIncidences, (state, { sourceId }): State => ({ ...state, sourceId, error: undefined, status: EntityStatus.Pending })),
  on(IncidenceActions.saveIncidences, (state, { page, totalCount, incidences, status, error }): State => {
    return {
      ...state,
      incidences: page > 1
            ? [...(state?.incidences ?? []), ...(incidences ?? [])]
            : incidences,
      page,
      totalCount,
      status,
      error,
    }
  })
);
