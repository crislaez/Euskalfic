import { combineReducers } from "@ngrx/store";
import * as fromIncidenceMulti from "./incidence-multi.reducer";
import * as fromIncidenceSingle from "./indice-single.reducer";

export const combineFeatureKey = 'incidence';

export interface CombineState {
  [fromIncidenceMulti.incidenceMultiFeatureKey]: fromIncidenceMulti.State;
  [fromIncidenceSingle.incidenceSingleFeatureKey]: fromIncidenceSingle.State;

};

export const reducer = combineReducers({
  [fromIncidenceMulti.incidenceMultiFeatureKey]: fromIncidenceMulti.reducer,
  [fromIncidenceSingle.incidenceSingleFeatureKey]: fromIncidenceSingle.reducer,

});
