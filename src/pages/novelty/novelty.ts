import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions, LoadingController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
import { DetailNoveltyPage } from "../detail-novelty/detail-novelty";
/**
 * Generated class for the NoveltyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-novelty',
  templateUrl: 'novelty.html',
})
export class NoveltyPage {
  private iduser: String;
  private username: String;
  public misnovedades: any;
  aceptar;
  public loader: any;
  private novedad;
  private descripcion;
  private registroForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public _Service: ServicesParkProvider, public formBuilder: FormBuilder,  private modal: ModalController,
    public loading: LoadingController) {
    this.registroForm = formBuilder.group({
      novedad: ['', Validators.compose([Validators.maxLength(40), Validators.required])],
      descripcion: ['', Validators.compose([Validators.maxLength(245), Validators.required])]
    });
    this.misnovedades = [];
    this.loader = this.loading.create({
      content: "Cargando..."
    });
  }

  ionViewDidLoad() {
    this.loader.present();
    console.log('ionViewDidLoad NoveltyPage');
    this.storage.get('iduser').then((val) => {
      this.iduser = val;
      this.recargar(this.iduser);
      console.log('Your iduser is', val);
    });
    this.storage.get('username').then((val) => {
      this.username = val;
      console.log('Your username is', val);
    });
    
  }
  addNovedad(){
    console.log("addNovedad");
    
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    }
    var sw = true;
    if (!this.registroForm.controls.novedad.valid) {
      let alertModal = this.modal.create('ModalAlertPage', { label: 'Por favor ingrese un titulo.' }, myModalOptions);
      alertModal.present();
      sw = false;
    } else if (!this.registroForm.controls.descripcion.valid) {
      let alertModal = this.modal.create('ModalAlertPage', { label: 'Por favor ingrese una descripción del error que preseta la aplicación.' }, myModalOptions);
      alertModal.present();
      sw = false;
    }
    if (sw) {
      this._Service.postNovedad(this.iduser, this.novedad, this.descripcion).subscribe(data => {
        if (data.status == 201) {
          let alertModal = this.modal.create('ModalAlertPage', { label: '<b>¡Registro existoso!</b> En un plazo de 48 Horas revisaremos tu novedad, Gracias por usar FreeParking!.' }, myModalOptions);
          alertModal.present();
          this.registroForm.reset();
          this.GetNovedades(this.iduser);
        }else{
          let alertModal = this.modal.create('ModalAlertPage', { label: '<b>¡Error al crear la novedad!</b> Porfavor reporta el error al siguite correo jefferariza@outlook.com. Gracias!.' }, myModalOptions);
          alertModal.present();
        }
      });
    }
  }
  recargar(iduser){
    this.GetNovedades(iduser);
    this.loader.dismiss();
  }
  GetNovedades(iduser){
    this._Service.getNovedad(iduser).subscribe(data =>{
      console.log( data );
      this.misnovedades = (data);
      if(data){
        this.misnovedades = (data);
      }else{
        //this.misnovedades = "No hay novedades"
        
      }
      
    });
  }
  deleteNovetly(idnovedad){
    
    console.log("delete",idnovedad);
    this._Service.deleteNovedad(idnovedad).subscribe(data =>{
        
    }, (err) => {
      console.log(err)
    })
    setTimeout(() => {
      this.GetNovedades(this.iduser);
      
    }, 500);
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    }
    let alertModal = this.modal.create('ModalAlertPage', { label: '<b>¡Novedad Eliminada!</b> No se generara ninguna acción para esta novedad!.' }, myModalOptions);
    alertModal.present();
   
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.GetNovedades(this.iduser);
      refresher.complete();
    }, 2000);
  }
  goTodetail(idnovedad, nombre, des){
    this.navCtrl.push(DetailNoveltyPage, {id: idnovedad, nombre: nombre, descripcion: des})
  }

}
