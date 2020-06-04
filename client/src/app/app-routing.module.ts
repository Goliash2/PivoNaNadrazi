import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pub-list',
    loadChildren: () => import('./pub-list/pub-list.module').then( m => m.PubListPageModule)
  },
  {
    path: 'pub-map',
    loadChildren: () => import('./pub-map/pub-map.module').then( m => m.PubMapPageModule)
  },
  {
    path: 'pub-home',
    loadChildren: () => import('./pub-home/pub-home.module').then( m => m.PubHomePageModule)
  },
  {
    path: 'pub-more',
    loadChildren: () => import('./pub-more/pub-more.module').then( m => m.PubMorePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
