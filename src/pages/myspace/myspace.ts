import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyspacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myspace',
  templateUrl: 'myspace.html',
})
export class MyspacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

   public event = {
    month: '2017-02-19',
    timeEnds: '2017-02-20'
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyspacePage');
  }

}
