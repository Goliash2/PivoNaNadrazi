import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubListPageRoutingModule } from './pub-list-routing.module';

import { PubListPage } from './pub-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubListPageRoutingModule
  ],
  declarations: [PubListPage]
})
export class PubListPageModule {}
