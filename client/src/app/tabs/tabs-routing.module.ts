import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pub-home/pub-home.module').then(m => m.PubHomePageModule)
      },
      {
        path: 'list',
        loadChildren: () => import('../pub-list/pub-list.module').then(m => m.PubListPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../pub-map/pub-map.module').then(m => m.PubMapPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('../pub-more/pub-more.module').then(m => m.PubMorePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
