import { Injectable } from '@angular/core';
import { NotificationActions } from '@euskalfic/shared/notification';
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { ToastController } from '@ionic/angular';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CameraActions from '../actions/camera.actions';
import { CameraService } from '../services/camera.service';


@Injectable()
export class CameraEffects implements OnInitEffects {

  loadCameras$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CameraActions.loadCameras),
      switchMap(({page, sourceId}) => {
        const callService$ = !sourceId
                          ? this._camera.getCameras(page)
                          : this._camera.getCamerasByIdSource(page, sourceId);

        return callService$ .pipe(
          map(({cameras, totalCount}) => CameraActions.saveCameras({ cameras, page, totalCount, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              CameraActions.saveCameras({ cameras:[], page, totalCount: 0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_CAMERAS'})
            )
          })
        )
      })
    )
  });

  loadCamera$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CameraActions.loadCamera),
      switchMap(({cameraId, sourceId}) => {
        return this._camera.getCameraById(cameraId, sourceId).pipe(
          map(camera => CameraActions.saveCamera({ camera, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              CameraActions.saveCamera({ camera:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_CAMERA'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return CameraActions.loadCameras({page:1, sourceId: null});
  };


  constructor(
    private actions$: Actions,
    private _camera: CameraService,
    public toastController: ToastController,
  ) { }


}

