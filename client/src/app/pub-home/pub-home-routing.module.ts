import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubHomePage } from './pub-home.page';

const routes: Routes = [
  {
    path: '',
    component: PubHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubHomePageRoutingModule {}
