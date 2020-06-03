import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubHomePageRoutingModule } from './pub-home-routing.module';

import { PubHomePage } from './pub-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubHomePageRoutingModule
  ],
  declarations: [PubHomePage]
})
export class PubHomePageModule {}
