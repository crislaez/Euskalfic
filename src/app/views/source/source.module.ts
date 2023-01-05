import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponentModule } from '@euskalfic/shared-ui/card/card.module';
import { InfiniteScrollComponentModule } from '@euskalfic/shared-ui/infinite-scroll/infinite-scroll.module';
import { NoDataComponentModule } from '@euskalfic/shared-ui/no-data/no-data.module';
import { SkeletonCardComponentModule } from '@euskalfic/shared-ui/skeleton-card/skeleton-card.module';
import { SourceModule } from '@euskalfic/shared/source/source.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SourcePage } from './containers/source.page';
import { SourcePageRoutingModule } from './source-routing.module';

const SHARED_MODULE = [
  SourceModule,
];

const SHARED_UI_MODULE = [
  CardComponentModule,
  NoDataComponentModule,
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
    SourcePageRoutingModule
  ],
  declarations: [SourcePage]
})
export class SourcePageModule {}
