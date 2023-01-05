
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as FlowActions from '../actions/flow.actions';
import { Flow } from '../models';

export const flowSingleFeatureKey = 'single';

export interface State {
  [key: string]:{
    flow: Flow;
    status: EntityStatus;
    error?: unknown;
  }
}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(FlowActions.loadFlow, (state, { meterId }): State => ({
    ...state,
    [meterId]:{
      ...(state?.[meterId] ?? {}),
      error: undefined,
      status: EntityStatus.Pending,
    }
  })),
  on(FlowActions.saveFlow, (state, { flow, status, error }): State => {
    const { properties = 0 } = flow || {};
    const { meterId = 0 } = properties || {};
    return {
      ...state,
      [meterId]:{
        ...(state?.[meterId] ?? {}),
        flow,
        error,
        status
      }
    }
  })
);
