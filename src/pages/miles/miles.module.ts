import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MilesPage } from './miles';

@NgModule({
  declarations: [
    MilesPage,
  ],
  imports: [
    IonicPageModule.forChild(MilesPage),
  ],
  exports: [
    MilesPage
  ]
})
export class MilesPageModule {}
