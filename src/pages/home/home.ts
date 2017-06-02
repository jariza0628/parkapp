import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BlocksPage } from '../blocks/blocks';
import { ServicesParkProvider } from '../../providers/services-park/services-park';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ServicesParkProvider]
})
export class HomePage {
	public spacesFree: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public parkService: ServicesParkProvider)
  {
  	this.spacesFree = [];
  }

 
   ionViewDidLoad() {
  	this.parkService.getSpaceFreeToday().subscribe(
        data => {
          this.spacesFree = (data);
          console.log(this.spacesFree);
        }
      );
    console.log('ionViewDidLoad Home');
  }
  goToBlocks() {
    this.navCtrl.push(BlocksPage);
  }
}
