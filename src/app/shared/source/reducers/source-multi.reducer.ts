
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createReducer, on } from '@ngrx/store';
import * as SourceActions from '../actions/source.actions';
import { Source } from '../models';

export const sourceMultiFeatureKey = 'multi';

export interface State {
  status: EntityStatus;
  sources?: Source[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  sources: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SourceActions.loadSources, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(SourceActions.saveSources, (state, { sources, status, error }): State => {
    return {
      ...state,
      sources,
      status,
      error,
    }
  })
);
