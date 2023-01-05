import { Injectable } from '@angular/core';
import { NotificationActions } from '@euskalfic/shared/notification';
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { ToastController } from '@ionic/angular';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FlowActions from '../actions/flow.actions';
import { FlowService } from '../services/flow.service';


@Injectable()
export class FlowEffects implements OnInitEffects {

  loadFlows$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FlowActions.loadFlows),
      switchMap(({page, sourceId}) => {
        const callService$ = !sourceId
                            ? this._flow.getFlows(page)
                            : this._flow.getFlowsByIdSource(page, sourceId);

        return callService$.pipe(
          map(({flows, totalCount}) => FlowActions.saveFlows({ flows, page, totalCount, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              FlowActions.saveFlows({ flows:[], page, totalCount: 0, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_FLOWS'})
            )
          })
        )
      })
    )
  });

  loadFlow$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FlowActions.loadFlow),
      switchMap(({meterId}) => {
        return this._flow.getFlowById(meterId).pipe(
          map(flow => FlowActions.saveFlow({ flow, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              FlowActions.saveFlow({ flow:{}, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_FLOW'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return FlowActions.loadFlows({page:1, sourceId: null});
  };


  constructor(
    private actions$: Actions,
    private _flow: FlowService,
    public toastController: ToastController,
  ) { }


}

