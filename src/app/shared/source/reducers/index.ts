import { combineReducers } from "@ngrx/store";
import * as fromSource from "./source-multi.reducer";

export const combineFeatureKey = 'source';

export interface CombineState {
  [fromSource.sourceMultiFeatureKey]: fromSource.State;

};

export const reducer = combineReducers({
  [fromSource.sourceMultiFeatureKey]: fromSource.reducer,
});
