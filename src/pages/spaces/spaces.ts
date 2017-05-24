import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailSpacePage } from '../detail-space/detail-space';
/**
 * Generated class for the SpacesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-spaces',
  templateUrl: 'spaces.html',
})
export class SpacesPage {
  icons: "car";	
  items: Array<{title: string, icon: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	// If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
   

    this.items = [];
    for (let i = 1; i < 10; i++) {
      this.items.push({
        title: 'Espacio ' + i,
        icon: 'car'
      });
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpacesPage');
  }
  goToSpaces() {
    this.navCtrl.push(DetailSpacePage);
  }

}
