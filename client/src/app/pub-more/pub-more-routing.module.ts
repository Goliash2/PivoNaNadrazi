import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubMorePage } from './pub-more.page';

const routes: Routes = [
  {
    path: '',
    component: PubMorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubMorePageRoutingModule {}
