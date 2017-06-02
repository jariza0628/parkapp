import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FloorsPage } from '../floors/floors';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
/**
 * Generated class for the BlocksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html',
  providers: [ServicesParkProvider]
})
export class BlocksPage {
  public block: any;
  public bildingID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public parkService: ServicesParkProvider) {
  this.bildingID = this.navParams.get('bildingID');
  this.block = [];
  console.log(this.bildingID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlocksPage');
    this.parkService.getBlockByIdbuildind(this.bildingID).subscribe(
        data => {
          this.block = (data);
          //console.log(this.block);
        }
      );
    
  }
  goToFloors(blockId) {
    this.navCtrl.push(FloorsPage, {blockId:blockId});
  }
}
