import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, LoadingController, ModalController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
/**
 * Generated class for the DetailNoveltyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-novelty',
  templateUrl: 'detail-novelty.html',
})
export class DetailNoveltyPage {
  private respuesta;
  private registroForm: FormGroup;
  public loader: any;
  public idnov: any;
  public nombre_novedad: any;
  public des: any;
  public answer: any;
  public username;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public _Service: ServicesParkProvider, public formBuilder: FormBuilder, private modal: ModalController,
    public loading: LoadingController)
     {
    this.registroForm = formBuilder.group({
      respuesta: ['', Validators.compose([Validators.maxLength(240), Validators.required])]
    });
    this.loader = this.loading.create({
      content: "Cargando..."
    });
    this.idnov = navParams.get('id');
    this.nombre_novedad = navParams.get('nombre');
    this.des = navParams.get('descripcion');
    this.answer=[];
    this.storage.get('username').then((val) => {
      this.username = val;
      console.log('Your username is', val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNoveltyPage');
    console.log("id Novedad", this.idnov);
    console.log("nombre_novedad  ", this.nombre_novedad);
    this.recargar(this.idnov);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.recargar(this.idnov);
      refresher.complete();
    }, 2000);
  }
  recargar(id){
    this.getAnswer(id);
  }
  getAnswer(idnovedad){
    this._Service.getAnswer(idnovedad).subscribe(data =>{
      if(data){
        console.log("Respuetas", data);
        this.answer = (data);
      }
    })
  }
  addAnswer(){
    console.log("addAnswer");

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    }
    var sw = true;
    if (!this.registroForm.controls.respuesta.valid) {
      let alertModal = this.modal.create('ModalAlertPage', { label: 'Campo Requerido, Maximo de caracteres 240.' }, myModalOptions);
      alertModal.present();
      sw = false;
    } 
    console.log("nov:",this.idnov, this.respuesta, this.username);
    
    if (sw) {
      this._Service.postAnswer(this.idnov, this.respuesta, this.username).subscribe(data => {
        if (data.status == 201) {
          let alertModal = this.modal.create('ModalAlertPage', { label: '<b>¡Registro existoso!</b> En un plazo de 48 Horas revisaremos tu respuesta, Gracias por usar FreeParking!.' }, myModalOptions);
          alertModal.present();
          this.registroForm.reset();
          
        } else {
          let alertModal = this.modal.create('ModalAlertPage', { label: '<b>¡Error al crear la respuesta!</b> Porfavor reporta el error al siguite correo jefferariza@outlook.com. Gracias!.' }, myModalOptions);
          alertModal.present();
        }
      });
    }
  }

}
 