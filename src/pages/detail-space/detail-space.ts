import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
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
  public tiporol: any;
  
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public alertCtrl: AlertController,
    public varsGlobals: VarsGlobalsProvider,
  	public parkService: ServicesParkProvider
  ){
  	this.space = [];

  	this.spaceId = this.navParams.get('spaceId');
  	this.nombre = "Jeffer";
  }

  saveinfo(iduser, id){  
    
    console.log("espacio "+id);
    this.parkService.sendinfo(this.varsGlobals.getUserId(),id);
     this.showAlert() ;

  }

  ionViewDidLoad() {
    this.tiporol = this.varsGlobals.getrol();
    console.log(this.tiporol);
  	this.parkService.getSpacesWhithCalendarFree(this.spaceId).subscribe(
        data => {
          this.space = (data);
          console.log(this.space);
        }
      );

    
      
    console.log('ionViewDidLoad DetailSpacePage');
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Guardado!!',
      subTitle: 'Utilizando este espacio.',
      buttons: ['OK']
    });
    this.ionViewDidLoad();
    alert.present();
  }

}
