import { ChangeDetectionStrategy, Component, EventEmitter, ViewChild } from '@angular/core';
import { FilterModalComponent } from '@euskalfic/shared-ui/filter-modal/filter-modal.page';
import { CameraActions, fromCamera } from '@euskalfic/shared/camera';
import { Source, fromSource } from '@euskalfic/shared/source';
import { APP_COLORS } from '@euskalfic/shared/utils/constant';
import { EntityStatus } from '@euskalfic/shared/utils/enum';
import { getLastNumber, gotToTop, trackById } from '@euskalfic/shared/utils/funcionts';
import { componentState } from '@euskalfic/shared/utils/models';
import { IonContent, ModalController } from '@ionic/angular';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import * as fromCameraPage from '../selectors/camera-page.selectros';


@Component({
  selector: 'app-camera',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <h1 class="text-color-gradient">{{ 'COMMON.CAMERAS' | translate }}</h1>
      <div class="empty-div"></div>

      <ng-container *ngIf="cameras$ | async as cameras">
        <ng-container *ngIf="cameraInfo$ | async as cameraInfo">
          <ng-container *ngIf="cameraInfo?.status !== EntityStatus.Pending || (componentState?.page || 1) !== 1; else loader">
            <ng-container *ngIf="cameraInfo?.status !== EntityStatus.Error; else serverError">
              <ng-container *ngIf="(cameras?.length || []) > 0; else noData">

                <app-card
                  *ngFor="let item of cameras; let i = index; trackBy: trackById"
                  [item]="item"
                  [from]="'cameras'"
                  [backgroundColor]="$any($any(appCorlors)?.[getLastNumber(i)])">
                </app-card>

                <app-infinite-scroll
                  [slice]="cameras.length"
                  [status]="cameraInfo?.status || EntityStatus.Loaded"
                  [total]="cameraInfo?.total || 0"
                  (loadDataTrigger)="loadData($event, cameraInfo?.page || 1)">
                </app-infinite-scroll>

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
        <app-skeleton-card *ngFor="let item of [1,2,3,4,5,6,7,8,9,10]; trackBy: trackById"></app-skeleton-card>
      </ng-template>
    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>

    <!-- FILTER  -->
    <ion-fab *ngIf="sources$ | async as sources" vertical="bottom" horizontal="start" slot="fixed">
      <ion-fab-button *ngIf="sources$ | async"
        class="color-button-text ion-fab-button-filter"
        (click)="openFilterModal(sources)">
        <ion-icon name="options-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./camera.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CameraPage {

  appCorlors = APP_COLORS;
  EntityStatus = EntityStatus;
  getLastNumber = getLastNumber;
  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content!: IonContent;

  showButton: boolean = false;
  nextPage: number = 1;
  sourceStatus$ = this.store.select(fromSource.selectStatus);
  sources$ = this.store.select(fromSource.selectSources);
  cameraInfo$ = this.store.select(fromCameraPage.selectCameraPageInfo);

  componentState!: componentState;
  trigger = new EventEmitter<componentState>();
  cameras$ = this.trigger.pipe(
    concatLatestFrom(() => this.store.select(fromCamera.selectFilterSourceId)),
    tap(([{page, reload, sourceId}, storeSourceId]) => {

      if(!reload){
        this.componentState = {
          ...this.componentState,
          sourceId: storeSourceId
        };
      }

      if(!!reload || page > 1){
        this.store.dispatch(CameraActions.loadCameras({page, sourceId: sourceId || null}))
      }
    }),
    switchMap(() =>
      this.store.select(fromCamera.selectCameras)
    )
  );


  constructor(
    private store: Store,
    public modalController: ModalController,
  ) { }


  ionViewWillEnter(): void{
    this.componentState = {
      page: 1,
      sourceId: null,
      reload: false
    };
    this.trigger.next(this.componentState);
  }

  // REFRESH
  doRefresh(event: any) {
    setTimeout(() => {
      this.componentState = {
        page: this.nextPage,
        sourceId: null,
        reload: true
      };
      this.trigger.next(this.componentState);
      event.target.complete();
    }, 500);
  }

  // INIFINITE SCROLL
  loadData({event, total}:{event: any, total: number}, statusPage: number) {
    this.componentState = {
      ...this.componentState,
      page: (statusPage + this.nextPage),
      reload: false
    };

    this.trigger.next(this.componentState);
    event.target.complete();
  }

  // OPEN FILTER MODAL
  async openFilterModal(sourceFilter: Source[] = []) {
    const { sourceId:sourceIdSelected = null } = this.componentState || {};
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        sourceIdSelected,
        sourceFilter,
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.2,
    });

    modal.present();

    const { data = null } = await modal.onDidDismiss();
    if(!data || Object.keys(data || {})?.length === 0) return;

    const { sourceId = null } = (data as any) || {};
    this.componentState = {
      page: this.nextPage,
      sourceId,
      reload:true
    };

    gotToTop(this.content); //GO TO TOP 500 msegundos

    setTimeout(() => {
      this.trigger.next(this.componentState)
    },500); //500 msegundos
  }

  // SCROLL
  logScrolling({detail:{scrollTop = 0}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
