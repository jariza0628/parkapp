import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailSpacePage } from './detail-space';

@NgModule({
  declarations: [
    DetailSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailSpacePage),
  ],
  exports: [
    DetailSpacePage
  ]
})
export class DetailSpacePageModule {}
