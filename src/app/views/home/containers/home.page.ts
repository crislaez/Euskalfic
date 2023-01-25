import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { APP_COLORS } from '@euskalfic/shared/utils/constant';
import { gotToTop, trackById } from '@euskalfic/shared/utils/funcionts';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-home',
  template:`
  <ion-content [fullscreen]="true" [scrollEvents]="true" (ionScroll)="logScrolling($any($event))">

    <div class="empty-header components-background-primary">
    </div>

    <div class="container components-background-dark">
      <h1 class="text-color-gradient">{{ 'COMMON.HOME' | translate }}</h1>
      <div class="empty-div"></div>

      <div
        *ngFor="let item of iteratable; let i = index; trackBy: trackById"
        [routerLink]="[item?.link]"
        class="home-div displays-center ion-activatable ripple-parent"
        [ngStyle]="{'background':appCorlors[i]}">
        <div class="displays-center">
          <div><ion-icon [name]="item?.icon"></ion-icon></div>
          <div class="margin-left-5">{{ item?.label || '' | translate }}</div>
        </div>
        <!-- RIPLE EFFECT  -->
        <ion-ripple-effect></ion-ripple-effect>
      </div>

    </div>

    <!-- TO TOP BUTTON  -->
    <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button class="color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
    </ion-fab>
  </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  appCorlors = APP_COLORS;
  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content!: IonContent;

  showButton: boolean = false;
  iteratable = [
    {id:1, label:'COMMON.INCIDENCES', icon:'warning-outline', link:'/incidences'},
    {id:2, label:'COMMON.FLOWS', icon:'trending-up-outline', link:'/flows'},
    {id:3, label:'COMMON.CAMERAS', icon:'videocam-outline', link:'/cameras'},
    {id:4, label:'COMMON.SOURCE', icon:'business-outline', link:'/source'},
  ];


  constructor() { }


  logScrolling({detail:{scrollTop = 0}}): void{
    if(scrollTop >= 300) this.showButton = true
    else this.showButton = false
  }

}
