import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubListPage } from './pub-list.page';

const routes: Routes = [
  {
    path: '',
    component: PubListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubListPageRoutingModule {}
