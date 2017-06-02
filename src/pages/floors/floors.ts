import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpacesPage } from '../spaces/spaces';
import { ServicesParkProvider } from '../../providers/services-park/services-park';

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
  providers: [ServicesParkProvider]
})
export class FloorsPage {
  public floors: any;
  public blockId: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public parkService: ServicesParkProvider)
  {
    this.blockId = this.navParams.get('blockId');
    this.floors = [];
  }

  ionViewDidLoad() {
      this.parkService.getFloors(this.blockId).subscribe(
        data => {
          this.floors = (data);
          console.log(this.floors);
        }
      );
    console.log('ionViewDidLoad FloorsPage');
  }


  goToSpaces(floorId) {
    this.navCtrl.push(SpacesPage, {floorId:floorId});
  }
}
