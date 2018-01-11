import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNoveltyPage } from './detail-novelty';

@NgModule({
  declarations: [
    DetailNoveltyPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNoveltyPage),
  ],
  exports: [
    DetailNoveltyPage
  ]
})
export class DetailNoveltyPageModule {}
