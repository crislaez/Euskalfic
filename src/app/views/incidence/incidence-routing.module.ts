import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidencePage } from './containers/incidence.page';

const routes: Routes = [
  {
    path: '',
    component: IncidencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidencePageRoutingModule {}
