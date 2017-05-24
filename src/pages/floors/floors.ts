import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpacesPage } from '../spaces/spaces';
/**
 * Generated class for the FloorsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-floors',
  templateUrl: 'floors.html',
})
export class FloorsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FloorsPage');
  }
  goToSpaces() {
    this.navCtrl.push(SpacesPage);
  }
}
