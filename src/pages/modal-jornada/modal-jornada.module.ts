import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalJornadaPage } from './modal-jornada';

@NgModule({
  declarations: [
    ModalJornadaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalJornadaPage),
  ],
  exports: [
    ModalJornadaPage
  ]
})
export class ModalJornadaPageModule {}
