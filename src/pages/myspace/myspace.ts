import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,LoadingController } from 'ionic-angular';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
import { ServicesParkProvider } from '../../providers/services-park/services-park';



/**
 * Generated class for the MyspacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myspace',
  templateUrl: 'myspace.html',
  providers: [ServicesParkProvider]
})
export class MyspacePage {
  public dia: string;
  public mes: string;
  public anio: number;
  public dia2: string;
  public mes2: string;
  public anio2: number;
  public myDate: string;
  public myDate2: string;
  public fechaenviada: string;
  public jornada:string;
  public userID: string;
  public FreeDays: any;
  public loader: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public parkService: ServicesParkProvider,
    public loading:LoadingController,
    public varsGlobals: VarsGlobalsProvider) 
  {
    this.dia = "0";
    this.mes = "0";
    this.anio = 0;
    this.dia2 = "0";
    this.mes2= "0";
    this.anio2 = 0;
    this.myDate =  new Date().toISOString();
    this.myDate2 =  new Date().toISOString();
    this.fechaenviada = "0000";
    this.jornada = "0";
    this.userID= "000";
    this.FreeDays = [];
    this.loader = this.loading.create({
      content: "Cargando..."
    });
  }

  

   public event = {
    month: '2017-02-20',
    timeEnds: '2017-02-20'
  }
  ionViewDidLoad() {
     this.loader.present();
    console.log('ionViewDidLoad MyspacePage');
      this.parkService.getDaysFreeByUser(this.varsGlobals.getUserId).subscribe(
        data => {
          this.FreeDays = (data);
          console.log(this.FreeDays);
          this.loader.dismiss();
        }
      );
    
  }
  fecha(jornada){
    
    this.anio = Number(this.myDate.substring(0,4));
    this.mes = this.myDate.substring(5,7);
    this.dia = this.myDate.substring(8,10);
    this.anio2 = Number(this.myDate2.substring(0,4));
    this.mes2 = this.myDate2.substring(5,7);
    this.dia2 = this.myDate2.substring(8,10);
    this.jornada = jornada;

    if(new Date(this.myDate)>new Date(this.myDate2)){
      this.showAlert();
    }else{
      if(this.varsGlobals.getUserId().length == 1){
        this.userID = "00"+this.varsGlobals.getUserId();
      }
      if(this.varsGlobals.getUserId().length == 2){
        this.userID = "0"+this.varsGlobals.getUserId();
      }
      if(this.varsGlobals.getUserId().length == 3){
        this.userID = this.varsGlobals.getUserId();
      }
      this.fechaenviada = this.anio +""+this.mes+""+this.dia +"-"+this.anio2+""+this.mes2+""+this.dia2+"-"+this.userID+"-"+this.jornada;
      console.log(this.fechaenviada);
      this.parkService.freeSpace(this.fechaenviada);
      this.showAlertDate();
      this.recargar();
    }

   
  }

  DelFreeSpace(idcalendar){
    this.parkService.DelFreeSpace(idcalendar);
    console.log('unlockSpace');
    this.showAlertDateDelete();
    this.recargar();

  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.parkService.getDaysFreeByUser(this.varsGlobals.getUserId).subscribe(
        data => {
          this.FreeDays = (data);
          console.log(this.FreeDays);
        }
      );
      refresher.complete();
    }, 2000);
  }
  recargar(){

     setTimeout(() => {
      this.parkService.getDaysFreeByUser(this.varsGlobals.getUserId).subscribe(
        data => {
          this.FreeDays = (data);
          console.log(this.FreeDays);
        }
      );
      
    }, 1600);
  }
    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!!',
      subTitle: 'Rangos de fechas erroneo',
      buttons: ['OK']
    });
    alert.present();
  }
   showAlertDate() {
    let alert = this.alertCtrl.create({
      title: 'Guardado!!',
      subTitle: 'Fecha liberada.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertDateDelete() {
    let alert = this.alertCtrl.create({
      title: 'Eliminado!!',
      subTitle: 'Fecha Borrada.',
      buttons: ['OK']
    });
    alert.present();
  }

}
