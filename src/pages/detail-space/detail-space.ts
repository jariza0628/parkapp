import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesParkProvider } from '../../providers/services-park/services-park';

/**
 * Generated class for the DetailSpacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-space',
  templateUrl: 'detail-space.html',
  providers: [ServicesParkProvider]
})
export class DetailSpacePage {
  public spaceId: any;
  public space: any;
  public nombre: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public parkService: ServicesParkProvider
  ){
  	this.space = [];
  	this.spaceId = this.navParams.get('spaceId');
  	this.nombre = "Jeffer";
  }

  ionViewDidLoad() {
  	this.parkService.getSpace(this.spaceId).subscribe(
        data => {
          this.nombre = (data.numero);
          console.log(this.nombre);
        }
      );
      
    console.log('ionViewDidLoad DetailSpacePage');
  }

}
