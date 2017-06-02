import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyspacePage } from './myspace';

@NgModule({
  declarations: [
    MyspacePage,
  ],
  imports: [
    IonicPageModule.forChild(MyspacePage),
  ],
  exports: [
    MyspacePage
  ]
})
export class MyspacePageModule {}
