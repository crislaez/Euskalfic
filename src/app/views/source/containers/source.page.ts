import { startWith, switchMap, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { APP_COLORS } from '@euskalfic/shared/utils/constant';
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { getLastNumber, gotToTop, trackById } from '@euskalfic/shared/utils/funcionts';
import { IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { SourceActions, fromSource } from '@euskalfic/shared/source';
import { componentState } from '@euskalfic/shared/utils/models';

@Component({
  selector: 'app-source',
  template: `
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <h1 class="text-color-gradient">{{ 'COMMON.FLOWS' | translate }}</h1>
      <div class="empty-div"></div>

      <ng-container *ngIf="source$ | async as source">
        <ng-container *ngIf="status$ | async as status">
          <ng-container *ngIf="status !== EntityStatus.Pending; else loader">
            <ng-container *ngIf="status !== EntityStatus.Error; else serverError">
              <ng-container *ngIf="(source?.length || []) > 0; else noData">

                <app-card
                  *ngFor="let item of source; let i = index; trackBy: trackById"
                  [item]="item"
                  [from]="'source'"
                  [backgroundColor]="$any($any(appCorlors)?.[getLastNumber(i)])">
                </app-card>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <!-- REFRESH -->
      <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- IS ERROR -->
      <ng-template #serverError>
        <app-no-data [title]="'COMMON.ERROR'" [image]="'assets/images/error.png'" [top]="'35vh'"></app-no-data>
      </ng-template>

      <!-- IS NO DATA  -->
      <ng-template #noData>
        <app-no-data [title]="'COMMON.NORESULT'" [image]="'assets/images/empty.png'" [top]="'20vh'"></app-no-data>
      </ng-template>

      <!-- LOADER  -->
      <ng-template #loader>
        <app-skeleton-card *ngFor="let item of [1,2,3,4,5,6,7]; trackBy: trackById"></app-skeleton-card>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./source.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcePage {

  appCorlors = APP_COLORS;
  EntityStatus = EntityStatus;
  getLastNumber = getLastNumber;
  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content!: IonContent;

  showButton: boolean = false
  componentState: boolean = false;

  status$ = this.store.select(fromSource.selectStatus);
  trigger = new EventEmitter<boolean>();
  source$ = this.trigger.pipe(
    startWith(this.componentState),
    tap((bool) => {
      if(bool){
        this.store.dispatch(SourceActions.loadSources())
      }
    }),
    switchMap(() =>
      this.store.select(fromSource.selectSources)
    )
  );


  constructor(
    private store: Store
  ) { }


  // REFRESH
  doRefresh(event: any) {
    setTimeout(() => {
      this.componentState = true;
      this.trigger.next(this.componentState);
      event.target.complete();
    }, 500);
  }

  logScrolling({detail:{scrollTop = 0}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
