
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as FlowActions from '../actions/flow.actions';
import { Flow } from '../models';

export const flowMultiFeatureKey = 'multi';

export interface State {
  status: EntityStatus;
  flows?: Flow[];
  sourceId?: string | null;
  error?: unknown;
  page?: number;
  totalCount?: number;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  flows: [],
  sourceId: null,
  error: null,
  page: 1,
  totalCount: 0,
};

export const reducer = createReducer(
  initialState,
  on(FlowActions.loadFlows, (state, { sourceId }): State => ({ ...state, sourceId, error: undefined, status: EntityStatus.Pending })),
  on(FlowActions.saveFlows, (state, { page, totalCount, flows, status, error }): State => {
    return {
      ...state,
      flows: page > 1
            ? [...(state?.flows ?? []), ...(flows ?? [])]
            : flows,
      page,
      totalCount,
      status,
      error,
    }
  })
);
