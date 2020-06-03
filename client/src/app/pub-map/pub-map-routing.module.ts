import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubMapPage } from './pub-map.page';

const routes: Routes = [
  {
    path: '',
    component: PubMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubMapPageRoutingModule {}
