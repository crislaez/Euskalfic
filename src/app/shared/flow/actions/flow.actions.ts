import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createAction, props } from '@ngrx/store';
import { Flow } from '../models';


export const loadFlows = createAction(
  '[Flow] Load Flows',
  props<{ page: number, sourceId: string | null }>()
);

export const saveFlows = createAction(
  '[Flow] Save Flows',
  props<{ flows: Flow[], page: number, totalCount: number, error:unknown, status:EntityStatus }>()
);


export const loadFlow = createAction(
  '[Flow] Load Flow',
  props<{ meterId: number }>()
);

export const saveFlow = createAction(
  '[Flow] Save Flow',
  props<{ flow: Flow, error:unknown, status:EntityStatus }>()
);
