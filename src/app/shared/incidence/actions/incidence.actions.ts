import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createAction, props } from '@ngrx/store';
import { Incidence } from '../models';


export const loadIncidences = createAction(
  '[Incidence] Load Incidences',
  props<{ page:number, sourceId: string | null }>()
);

export const saveIncidences = createAction(
  '[Incidence] Save Incidences',
  props<{ incidences: Incidence[], page: number, totalCount: number, error:unknown, status:EntityStatus }>()
);


export const loadIncidence = createAction(
  '[Incidence] Load Incidence',
  props<{ incidenceId: number, sourceId: number }>()
);

export const saveIncidence = createAction(
  '[Incidence] Save Incidence',
  props<{ incidence: Incidence, error:unknown, status:EntityStatus }>()
);
