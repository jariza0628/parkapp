import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlocksPage } from '../blocks/blocks';
import { ServicesParkProvider } from '../../providers/services-park/services-park';


/**
 * Generated class for the BuildingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buildings',
  templateUrl: 'buildings.html',
})
export class BuildingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkService: ServicesParkProvider) {
  }


  ionViewDidLoad() {
  	this.parkService.getRemoteda();
    //console.log('ionViewDidLoad BuildingsPage');
  }
  goToSecondPage() {
    this.navCtrl.push(BlocksPage);
  }

}
