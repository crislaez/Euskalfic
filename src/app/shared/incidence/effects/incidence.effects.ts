import { Injectable } from '@angular/core';
import { NotificationActions } from '@euskalfic/shared/notification';
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { ToastController } from '@ionic/angular';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as IncidenceActions from '../actions/incidence.actions';
import { IncidenceService } from '../services/incidence.service';


@Injectable()
export class IncidenceEffects implements OnInitEffects {

  loadIncidences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IncidenceActions.loadIncidences),
      switchMap(({page, sourceId}) => {
        const callService$ = !sourceId
                          ? this._incidence.getIncidences(page)
                          : this._incidence.getIncidencesByIdSource(page, sourceId);

        return callService$.pipe(
          map(({incidences, totalCount}) => IncidenceActions.saveIncidences({ incidences, page, totalCount, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              IncidenceActions.saveIncidences({ incidences:[], page, totalCount: 0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_INCIDENCES'})
            )
          })
        )
      })
    )
  });

  saveIncidence$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IncidenceActions.loadIncidence),
      switchMap(({incidenceId, sourceId}) => {
        return this._incidence.getIncidenceById(incidenceId, sourceId).pipe(
          map((incidence) => IncidenceActions.saveIncidence({ incidence, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              IncidenceActions.saveIncidence({ incidence:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_INCIDENCE'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return IncidenceActions.loadIncidences({page:1, sourceId:null});
  };


  constructor(
    private actions$: Actions,
    private _incidence: IncidenceService,
    public toastController: ToastController,
  ) { }


}

