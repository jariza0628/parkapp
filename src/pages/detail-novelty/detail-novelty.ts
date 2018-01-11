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
  public answer: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public _Service: ServicesParkProvider, public formBuilder: FormBuilder, private modal: ModalController,
    public loading: LoadingController)
     {
    this.registroForm = formBuilder.group({
      respuesta: ['', Validators.compose([Validators.maxLength(100), Validators.required])]
    });
    this.loader = this.loading.create({
      content: "Cargando..."
    });
    this.idnov = navParams.get('id');
    this.answer=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNoveltyPage');
    this.recargar(this.idnov);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      
      refresher.complete();
    }, 2000);
  }
  recargar(id){
    this.getAnswer(id);
  }
  getAnswer(idnovedad){

  }

}
