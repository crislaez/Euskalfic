import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { createAction, props } from '@ngrx/store';
import { Source } from '../models';


export const loadSources = createAction(
  '[Source] Load Sources',
);

export const saveSources = createAction(
  '[Source] Save Sources',
  props<{ sources: Source[], error:unknown, status:EntityStatus }>()
);

