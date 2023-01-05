import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponentModule } from '@euskalfic/shared-ui/card/card.module';
import { FilterModalComponentModule } from '@euskalfic/shared-ui/filter-modal/filter-modal.module';
import { InfiniteScrollComponentModule } from '@euskalfic/shared-ui/infinite-scroll/infinite-scroll.module';
import { NoDataComponentModule } from '@euskalfic/shared-ui/no-data/no-data.module';
import { SkeletonCardComponentModule } from '@euskalfic/shared-ui/skeleton-card/skeleton-card.module';
import { CameraModule } from '@euskalfic/shared/camera/camera.module';
import { SourceModule } from '@euskalfic/shared/source/source.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CameraPageRoutingModule } from './camera-routing.module';
import { CameraPage } from './containers/camera.page';

const SHARED_MODULE = [
  CameraModule,
  SourceModule
];

const SHARED_UI_MODULE = [
  CardComponentModule,
  NoDataComponentModule,
  FilterModalComponentModule,
  SkeletonCardComponentModule,
  InfiniteScrollComponentModule,
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ...SHARED_MODULE,
    ...SHARED_UI_MODULE,
    TranslateModule.forChild(),
    CameraPageRoutingModule
  ],
  declarations: [CameraPage]
})
export class CameraPageModule {}
