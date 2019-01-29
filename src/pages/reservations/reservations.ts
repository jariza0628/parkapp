import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ReservationsProvider } from '../../providers/reservations/reservations';

/**
 * Generated class for the ReservationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
})
export class ReservationsPage {
  id: any;
  reservation: any;
  jornada: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _ReservationsProvider: ReservationsProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationsPage');
    this.getIduser();

  }
  /**
   * Consultar el id usario del localstorage
   */
  getIduser(){
    if(localStorage.getItem('id_usuario')){
      this.id = localStorage.getItem('id_usuario');
      this.getReservations();
    }else{
       this.presentToast('Error al consultar tus reservas.');
    }
  }
  /**
   * traer todas las reservas de un usario
   */
  getReservations(){
    this._ReservationsProvider.getReservationsByUser(this.id).subscribe(
      data => {
        console.log(data);
        if(data.length > 0){
          this.reservation = data;
        }
      }, 
      err => {
        console.log(err);
        this.presentToast('Error al consultar tus reservas.');

      }
    )
  }
  /**
   * Elimiar reserva
   * @param id 
   */
  deleteReservatiosById(id){
    this._ReservationsProvider.deleteReservation(id).subscribe(
      data => {
        console.log(data);
        this.getIduser()
        this.reservation = null;
        this.presentToast('Reserva eliminada.');

      }, 
      err => {
        console.log(err);
        this.presentToast('Error al eliminar tu reservas.');

      }
    )
  }
  change(j){
    this.jornada = null;
    this.jornada = j;
    console.log('jornada', this.jornada);
    
  }

  save() {
    if(this.jornada){
      this._ReservationsProvider.newReservation(this.jornada, this.id).subscribe(
        data => {
          console.log(data);
          this.getIduser();
          this.presentToast('Reserva creada.');
        }, 
        err => {
          console.log(err);
        }
      )  
    }else{
      this.presentToast('Selecciona una jornada');
    }
    
  }
 

  presentToast(text) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }

}
