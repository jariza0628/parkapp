import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  public loader: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public parkService: ServicesParkProvider,
    public loading: LoadingController)
  {
    this.blockId = this.navParams.get('blockId');
    this.floors = [];
    this.loader = this.loading.create({
      content: "Cargando..."
    }); 
  }

  ionViewDidLoad() {
    this.loader.present();
      this.parkService.getFloors(this.blockId).subscribe(
        data => {
          this.floors = (data);
          console.log(this.floors);
          this.loader.dismiss();
        }
      );
    console.log('ionViewDidLoad FloorsPage');
  }


  goToSpaces(floorId) {
    this.navCtrl.push(SpacesPage, {floorId:floorId});
  }
}
