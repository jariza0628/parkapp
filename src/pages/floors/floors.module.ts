import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorsPage } from './floors';

@NgModule({
  declarations: [
    FloorsPage,
  ],
  imports: [
    IonicPageModule.forChild(FloorsPage),
  ],
  exports: [
    FloorsPage
  ]
})
export class FloorsPageModule {}
