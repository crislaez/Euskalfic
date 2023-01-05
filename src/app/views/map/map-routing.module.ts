import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPage } from './containers/map.page';

const routes: Routes = [
  {
    path: '',
    children:[
      // {
      //   path:'',
      //   component: MapPage
      // },
      {
        path:'camera/:cameraId/:idSource',
        component: MapPage
      },
      {
        path:'incidence/:incidenceId/:idSource',
        component: MapPage
      },
      {
        path:'flow/:meterId',
        component: MapPage
      },
      {
        path: '**',
        redirectTo: '/home',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
