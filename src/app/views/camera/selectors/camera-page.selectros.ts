import { fromCamera } from '@euskalfic/shared/camera';
import { createSelector } from '@ngrx/store';

export const selectCameraPageInfo = createSelector(
  fromCamera.selectStatus,
  fromCamera.selectPage,
  fromCamera.selectTotal,
  (status, page, total) => {
    return{
      status,
      page,
      total
    }
  }
);
