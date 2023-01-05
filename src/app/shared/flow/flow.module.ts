import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from './../notification/notification.module';
import { FlowEffects } from './effects/flow.effects';
import { combineFeatureKey, reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(combineFeatureKey, reducer),
    EffectsModule.forFeature([FlowEffects]),
  ]
})
export class FlowModule {}
