import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailSpacePage } from '../detail-space/detail-space';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
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
  providers: [ ServicesParkProvider ]
})
export class SpacesPage {
  public floorId: any;
  public spaces: any;

  icons: "car";	
  items: Array<{title: string, icon: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public parkService: ServicesParkProvider) 
  {
    this.spaces = [];
    this.floorId = this.navParams.get('floorId');

    this.items = [];
    for (let i = 1; i < 10; i++) {
      this.items.push({
        title: 'Espacio ' + i,
        icon: 'car'
      });
    }
  
  }

  ionViewDidLoad() {
    this.parkService.getSpacesByfloorId(this.floorId).subscribe(
        data => {
          this.spaces = (data);
          console.log(this.floorId);
        }
      );

    console.log('ionViewDidLoad SpacesPage');
  }
  goToSpaces(spaceId) {
    this.navCtrl.push(DetailSpacePage, {spaceId:spaceId});
  }

}
