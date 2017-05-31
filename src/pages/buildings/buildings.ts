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
  providers: [ServicesParkProvider]
})
export class BuildingsPage {
  public Buildings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public parkService: ServicesParkProvider
  ){
    this.Buildings = [];
  }


  ionViewDidLoad() {
  	this.parkService.getRemoteda().subscribe(
        data => {
          this.Buildings = (data);
          console.log(this.Buildings);
        }
      );
    console.log('ionViewDidLoad BuildingsPage');
  }
  goToSecondPage(bildingID) {
    this.navCtrl.push(BlocksPage, {bildingID: bildingID});
  }

}
