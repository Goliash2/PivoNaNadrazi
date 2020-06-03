import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubMorePageRoutingModule } from './pub-more-routing.module';

import { PubMorePage } from './pub-more.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubMorePageRoutingModule
  ],
  declarations: [PubMorePage]
})
export class PubMorePageModule {}
