import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
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
  public utlizando: any;
  public hourNow: number;
  public ruleHour: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public varsGlobals: VarsGlobalsProvider,
    public parkService: ServicesParkProvider
  ) {
    this.space = [];
    this.ruleHour = 0;
    this.spaceId = this.navParams.get('spaceId');
    this.nombre = "Jeffer";
    this.utlizando = "no";
  }

  ionViewDidLoad() {
    console.log("userid: " + this.varsGlobals.getUserId());
    console.log("rol: " + this.varsGlobals.getrol());
    this.tiporol = this.varsGlobals.getrol();
    console.log(this.tiporol);
    this.parkService.getSpacesWhithCalendarFree(this.spaceId).subscribe(
      data => {
        this.space = (data);
        console.log(this.space);
      }
    );
    console.log('ionViewDidLoad DetailSpacePage');
    this.getTime();
  }
  saveinfo(iduser, id) {
    console.log("espacio " + id);
    this.utlizando = "si";
    this.parkService.sendinfo(this.varsGlobals.getUserId(), id);
    this.showAlert();
    setTimeout(() => {
      console.log('Async operation has ended');
      this.goToHome(this.utlizando, this.varsGlobals.getUserId(), this.varsGlobals.getrol(), this.varsGlobals.getUsuario());
    }, 500);
  }

  goToHome(utlizando, id_usuario, rol, nombre) {
    this.navCtrl.setRoot(HomePage, { utlizando: utlizando, id_usuario: id_usuario, rol: rol, nombre: nombre });
  }
  getTime(){
    console.log('Get TIme');
    this.parkService.getHourNow().subscribe(
      data => {
        this.hourNow = (data.hour);
        if(this.hourNow >= 6){
          console.log('Ya son las 6 o mas');
          this.ruleHour = 1;
        }else{
          console.log('No se puede separa aun');
          this.ruleHour = 0;
        }
      }
    )
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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      console.log("userid: " + this.varsGlobals.getUserId());
      console.log("rol: " + this.varsGlobals.getrol());
      this.tiporol = this.varsGlobals.getrol();
      console.log(this.tiporol);
      this.parkService.getSpacesWhithCalendarFree(this.spaceId).subscribe(
        data => {
          this.space = (data);
          console.log(this.space);
        }
      );
      console.log('ionViewDidLoad DetailSpacePage');
      this.getTime();
      refresher.complete();
    }, 2000);
  }
  
 

}
