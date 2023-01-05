import { combineReducers } from "@ngrx/store";
import * as fromCameraMulti from "./camera-multi.reducer";
import * as fromCameraSingle from "./camera-single.reducer";

export const combineFeatureKey = 'camera';

export interface CombineState {
  [fromCameraMulti.cameraMultiFeatureKey]: fromCameraMulti.State;
  [fromCameraSingle.cameraSingleFeatureKey]: fromCameraSingle.State;

};

export const reducer = combineReducers({
  [fromCameraMulti.cameraMultiFeatureKey]: fromCameraMulti.reducer,
  [fromCameraSingle.cameraSingleFeatureKey]: fromCameraSingle.reducer,

});
