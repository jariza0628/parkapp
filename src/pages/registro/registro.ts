import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the RegistroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  form: FormGroup;

  name: any;
  lastname: any;
  user: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public _service: ServicesParkProvider) {

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      user: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }


  saveUser() {
    if (this.form.valid) {
      // Save your values, using this.form.get('myField').value;
      console.log('this.form.valid', this.form.valid);
      this._service.saveNewuser(this.name, this.lastname, this.user, this.password).subscribe(
        (data: any) => {
          console.log(data);
          if (data.result.data == 'Usuario no disponible') {
            this.presentAlert2('Opss!!', 'El usuario que tratas de registra ya se encuentra registrado.');
          }else{
            this.presentAlert('Listo!!', 'Usuario creado.');
          }

        },
        err => {
          console.log(err);
          this.presentAlert2('Opss!', 'Error: ' + err);
        }
      )
    }
  }

  presentAlert(title, msj) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msj,
      buttons: ['Ok']
    });
    alert.present();
    this.navCtrl.pop();
  }
  presentAlert2(title, msj) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msj,
      buttons: ['Ok']
    });
    alert.present();
   }


}
