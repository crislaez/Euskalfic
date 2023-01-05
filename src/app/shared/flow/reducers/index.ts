import { combineReducers } from "@ngrx/store";
import * as fromFlowMulti from "./flow-multi.reducer";
import * as fromCameraSingle from "./flow-single.reducer";

export const combineFeatureKey = 'flow';

export interface CombineState {
  [fromFlowMulti.flowMultiFeatureKey]: fromFlowMulti.State;
  [fromCameraSingle.flowSingleFeatureKey]: fromCameraSingle.State;

};

export const reducer = combineReducers({
  [fromFlowMulti.flowMultiFeatureKey]: fromFlowMulti.reducer,
  [fromCameraSingle.flowSingleFeatureKey]: fromCameraSingle.reducer,

});
