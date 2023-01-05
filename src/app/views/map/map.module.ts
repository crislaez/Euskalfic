import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlowModule } from '@euskalfic/shared/flow/flow.module';
import { IncidenceModule } from '@euskalfic/shared/incidence/incidence.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CameraModule } from './../../shared/camera/camera.module';
import { MapPage } from './containers/map.page';
import { MapPageRoutingModule } from './map-routing.module';

const SHARED_MODULE = [
  CameraModule,
  IncidenceModule,
  FlowModule
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    // ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    MapPageRoutingModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
