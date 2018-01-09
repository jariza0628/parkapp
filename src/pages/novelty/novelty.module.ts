import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoveltyPage } from './novelty';

@NgModule({
  declarations: [
    NoveltyPage,
  ],
  imports: [
    IonicPageModule.forChild(NoveltyPage),
  ],
  exports: [
    NoveltyPage
  ]
})
export class NoveltyPageModule {}
