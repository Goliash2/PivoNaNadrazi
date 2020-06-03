import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PubMapPageRoutingModule } from './pub-map-routing.module';

import { PubMapPage } from './pub-map.page';

import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PubMapPageRoutingModule,
    LeafletModule
  ],
  declarations: [PubMapPage]
})
export class PubMapPageModule {}
