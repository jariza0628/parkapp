import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FloorsPage } from '../floors/floors';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
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
  public loader: any;
  public numspacefreeByBlock: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public parkService: ServicesParkProvider,
  public loadin: LoadingController,
  public varsGlobals: VarsGlobalsProvider) 
  {
  this.bildingID = this.navParams.get('bildingID');
  this.block = [];
  this.loader = this.loadin.create({
      content: "Cargando..."
    });
  console.log(this.bildingID);
  }

  ionViewDidLoad() {
    this.loader.present();

    console.log("userid: "+this.varsGlobals.getUserId());
        console.log("rol: "+this.varsGlobals.getrol());
    console.log('ionViewDidLoad BlocksPage');
    
    this.parkService.getBlockByIdbuildind(this.bildingID).subscribe(
        data => {
          this.block = (data);
          //console.log(this.block);
          this.loader.dismiss();
        }
      );

    
  }
  goToFloors(blockId) {
    this.navCtrl.push(FloorsPage, {blockId:blockId});
  }
}
