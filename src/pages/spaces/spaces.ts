import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  public loader: any;

  icons: "car";	
  items: Array<{title: string, icon: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public parkService: ServicesParkProvider,
    public loading: LoadingController) 
  {
    this.spaces = [];
    this.floorId = this.navParams.get('floorId');
    this.loader = this.loading.create({
      content: "Cargando..."
    });

    this.items = [];
    for (let i = 1; i < 10; i++) {
      this.items.push({
        title: 'Espacio ' + i,
        icon: 'car'
      });
    }
  
  }

  ionViewDidLoad() {
    this.loader.present();
    this.parkService.getSpacesByfloorId(this.floorId).subscribe(
        data => {
          this.spaces = (data);
          console.log(this.floorId);
          this.loader.dismiss();
        }
      );

    console.log('ionViewDidLoad SpacesPage');
  }
  goToSpaces(spaceId) {
    this.navCtrl.push(DetailSpacePage, {spaceId:spaceId});
  }

}
