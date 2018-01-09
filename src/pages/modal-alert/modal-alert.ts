import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

/**
 * Generated class for the ModalAlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-alert',
  templateUrl: 'modal-alert.html',
})
export class ModalAlertPage {
  label: string = "";
  title: string = "";
  ifTitle: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.ifTitle = this.navParams.get('ifTitle');
    this.label = this.navParams.get('label');
    this.title = this.navParams.get('title');
  }

  aceptar() {
    this.viewCtrl.dismiss();
  }

}
