import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [VarsGlobalsProvider]
})
export class LoginPage {
	public email: any;
	public clave: any;
	constructor(
		public http: Http,
		public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingController,
		public VarsGlobals: VarsGlobalsProvider,
		public alertCtrl: AlertController,
		public menu: MenuController,
		private storage: Storage
	) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
	ionViewDidEnter() {
		// Use the id to enable/disable the menus
		this.menu.enable(true, 'menu1');
		this.menu.enable(false, 'menu2');
	}
	doLogin() {
		console.log(this.email);
		console.log(this.clave);
		this.login(this.email, this.clave);
	}

	login(email, clave) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return new Promise(
			resolve => {
				this.http.get(this.VarsGlobals.urlApi + 'log/' + email + '/' + clave)
					.map(res => res.json())
					.subscribe((data1) => {
						resolve(data1);
						this.datas(data1);
						this.VarsGlobals.setUserId(data1.id_usuario);
						this.VarsGlobals.setUsuario(email);
						localStorage.setItem("id_usuario", data1.id_usuario);
						localStorage.setItem("email", email);
						localStorage.setItem("serial", clave);
						this.updatePlayerId(data1.id_usuario);
					},
						err => {
							console.log(err);
						}
					)
			}
		);
	}

	updatePlayerId(idUser) {
		let playerId;
		playerId = sessionStorage.getItem('idPlayer');
		console.log('IDS', playerId + 'USER ', idUser);
		this.VarsGlobals.playerId(idUser, playerId).subscribe(
			data => {


				console.log('player save', data);
			},
			err => {
				console.log('player save err', err);
			}
		)
	}


	showAlert() {
		let alert = this.alertCtrl.create({
			title: 'Error!!',
			subTitle: 'Datos erroneos',
			buttons: ['OK']
		});
		alert.present();
	}
	datas(data) {
		if (!data) {
			this.showAlert();
		} else {
			console.log(data)
			this.VarsGlobals.setUserId(data.id_usuario);
			this.storage.set('iduser', data.id_usuario);
			this.VarsGlobals.setbuildingId(1);//solo transelca edificio
			this.VarsGlobals.setrol(data.rol);
			sessionStorage.setItem('rol', data.rol);
			this.VarsGlobals.setUsuario(data.nombre + " " + data.apellido)
			this.storage.set('username', data.nombre);
			this.ionViewDidEnter();
			this.goToHome(data.id_usuario, data.rol, data.nombre + " " + data.apellido);

		}
	}
	goToHome(id_usuario, rol, nombre) {
		this.navCtrl.setRoot(HomePage, { id_usuario: id_usuario, rol: rol, nombre: nombre });
	}

}
