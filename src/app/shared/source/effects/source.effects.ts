import { Injectable } from '@angular/core';
import { NotificationActions } from '@euskalfic/shared/notification';
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { ToastController } from '@ionic/angular';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SourceActions from '../actions/source.actions';
import { SourceService } from '../services/source.service';


@Injectable()
export class SourceEffects implements OnInitEffects {

  loadSources$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SourceActions.loadSources),
      switchMap(() => {
        return this._source.getSources().pipe(
          map(({sources}) => SourceActions.saveSources({ sources, error:undefined, status:EntityStatus.Loaded })),
          catchError(error => {
            return of(
              SourceActions.saveSources({ sources:[], error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_SOURCES'})
            )
          })
        )
      })
    )
  });


  ngrxOnInitEffects() {
    return SourceActions.loadSources();
  };


  constructor(
    private actions$: Actions,
    private _source: SourceService,
    public toastController: ToastController,
  ) { }


}

