import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservationsProvider } from '../../providers/reservations/reservations';

/**
 * Generated class for the MilesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-miles',
  templateUrl: 'miles.html',
})
export class MilesPage {
  miles: any;
  iduser: any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _ReservationsProvider: ReservationsProvider) {
    this.iduser = localStorage.getItem('id_usuario');
    this.items = [];
    this.getNumMiles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MilesPage');
    this.getNumMiles();
    this.getHisoty();
    this.miles = 'Numero de millas';
  }

  getNumMiles() {
    console.log('ere');
    
    this._ReservationsProvider.getMilesTotals(this.iduser).subscribe(
      data => {
        console.log(data);
        this.miles = data[0].total_millas;
      },
      err => {
        console.log(err);
        
      }
    )
  }
  getHisoty() {
    console.log('items');
    
    this._ReservationsProvider.getMilesHistory(this.iduser).subscribe(
      data => {
        console.log(data);
        this.items = data;
      },
      err => {
        console.log(err);
        
      }
    )
  }

}
