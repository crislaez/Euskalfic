import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cameras',
    loadChildren: () => import('./views/camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'incidences',
    loadChildren: () => import('./views/incidence/incidence.module').then( m => m.IncidencePageModule)
  },
  {
    path: 'flows',
    loadChildren: () => import('./views/flow/flow.module').then( m => m.FlowPageModule)
  },
  {
    path: 'source',
    loadChildren: () => import('./views/source/source.module').then( m => m.SourcePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./views/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
