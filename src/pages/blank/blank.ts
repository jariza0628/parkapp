import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
import { ServicesParkProvider } from '../../providers/services-park/services-park';

/**
 * Generated class for the BlankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html',
  providers: [ServicesParkProvider]
})
export class BlankPage {
  public user: any;
  public loader: any;
  public md5: string;
  public passactual: any;
  public claveactual: string;
  public nombre: string;
  public usuario: string;
  public edificio: string;
  public id_usuario: any;
  public id: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public parkService: ServicesParkProvider,
    public loading:LoadingController,
    public varsGlobals: VarsGlobalsProvider,
    public alertCtrl: AlertController) 
  {
  	this.user = [];
  	this.md5 = "";
  	this.passactual = "";
  	 this.loader = this.loading.create({
      content: "Cargando..."
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlankPage');
    this.loader.present();
     if (this.varsGlobals.getUserId()!=null){
    	this.id = this.varsGlobals.getUserId();
    	console.log("id usu recibido: "+this.id);
    }
    this.services();
   
  }

  services(){
  	this.parkService.getUser(this.id).subscribe(
        data => {
          this.user = (data);
          this.claveactual = data.clave;
          this.nombre = data.nombre + " " + data.apellido;
          this.edificio = data.edificio;
          this.usuario = data.email;
          this.id_usuario = data.id_usuario;
          console.log(this.user);
       this.loader.dismiss();
        }
      );
  	
  }

  cambiarclave(passactual, passnueva, repassnueva){
  	this.passactual = passactual;
  	//console.log(passnueva+" "+repassnueva);

  	
  	this.parkService.getMd5(this.passactual).subscribe(
        data => {
          this.md5 = (data.md5);
          
          
        }
      );

  	 setTimeout(() => {
  	 	console.log("clave:"+this.claveactual);
  	 	console.log("md5  :"+this.md5);
           	if(this.md5 == this.claveactual){
		  		console.log("son iguales");
		  		if(passnueva == repassnueva){
		  			this.cambiarcontrasena( this.id_usuario, passnueva);
		  		}else{
		  			this.showAlert();
		  		}

		  	}else{
		  		this.showAlertclaveerronea();
		  		console.log("son diferentes");
		  	}
    }, 1200);

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Las contraseñas no coinciden.',
      buttons: ['OK']
    });
    alert.present();
  }
  showAlertclaveerronea() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Clave actual incorrecta.',
      buttons: ['OK']
    });
    alert.present();
  }
    cambioexitoso() {
    let alert = this.alertCtrl.create({
      title: 'Guardado!',
      subTitle: 'Cambio exitoso.',
      buttons: ['OK']
    });
    alert.present();
  }
   cambiarcontrasena(iduser, contrasena){  
    this.parkService.cambiarcontrasena(iduser, contrasena);
    this.cambioexitoso();
     console.log("entro cambio contraseña");
     

    
  }

}
