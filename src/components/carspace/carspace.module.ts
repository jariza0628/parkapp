import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarspaceComponent } from './carspace';

@NgModule({
  declarations: [
    CarspaceComponent,
  ],
  imports: [
    IonicPageModule.forChild(CarspaceComponent),
  ],
  exports: [
    CarspaceComponent
  ]
})
export class CarspaceComponentModule {}
