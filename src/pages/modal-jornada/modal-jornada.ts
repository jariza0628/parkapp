import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
import { ServicesParkProvider } from '../../providers/services-park/services-park';

/**
 * Generated class for the ModalJornadaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-jornada',
  templateUrl: 'modal-jornada.html',
})
export class ModalJornadaPage {
 
  public dia: string;
  public mes: string;
  public anio: number;
  public dia2: string;
  public mes2: string;
  public anio2: number;
  public myDate: string;
  public myDate2: string;
  public fechaenviada: string;
  public jornada: string;
  public userID: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public parkService: ServicesParkProvider,
    public varsGlobals: VarsGlobalsProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalJornadaPage');
  }
  aceptar() {

    this.viewCtrl.dismiss();

  }
  siguiente() {
  }

  fecha(jornada) {
    let mm: string;
    let dd : string;
    //  20190626-20190626-107-0 formato de liberacion 
    let hoy = new Date();
    dd =  String(hoy.getDate());
    mm = String(hoy.getMonth() + 1);
    let yyyy = hoy.getFullYear();

    console.log('fecha: dia '+ dd + 'mes '+ mm + 'añi' +yyyy);
    
    if (mm.length == 1) {
      mm = "0" + mm;
    }
    if (dd.length == 1) {
      dd = "0" + dd;
    }
    this.anio = yyyy;
    this.mes = mm;
    this.dia = dd;
    this.anio2 = yyyy;
    this.mes2 = mm;
    this.dia2 = dd;
    this.jornada = '0';
    if (this.varsGlobals.getUserId().length == 1) {
      this.userID = "00" + this.varsGlobals.getUserId();
    }
    if (this.varsGlobals.getUserId().length == 2) {
      this.userID = "0" + this.varsGlobals.getUserId();
    }
    if (this.varsGlobals.getUserId().length == 3) {
      this.userID = this.varsGlobals.getUserId();
    }
    this.fechaenviada = this.anio + "" + this.mes + "" + this.dia + "-" + this.anio2 + "" + this.mes2 + "" + this.dia2 + "-" + this.userID + "-" + this.jornada;
    console.log(this.fechaenviada);
    //this.parkService.freeSpace(this.fechaenviada);
  }
}
