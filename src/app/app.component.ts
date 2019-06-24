import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { BuildingsPage } from '../pages/buildings/buildings';
import { MyspacePage } from '../pages/myspace/myspace';
import { LoginPage } from '../pages/login/login';
import { BlankPage } from '../pages/blank/blank';
import { NoveltyPage } from "../pages/novelty/novelty";
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ReservationsPage } from '../pages/reservations/reservations';

import { VarsGlobalsProvider } from '../providers/vars-globals/vars-globals';
import { PushServiceProvider } from '../providers/push-service/push-service';
import { MilesPage } from '../pages/miles/miles';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon: string, component: any}>;
  pages2: Array<{title: string, icon: string, component: any}>;
  pages3: Array<{title: string, icon: string, component: any}>;
  pages4: Array<{title: string, icon: string, component: any}>;
  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public varsGlobals: VarsGlobalsProvider,
    public _pushService: PushServiceProvider,
    public http: Http,
    private storage: Storage,
 
    
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Mi Perfil',icon: 'person', component: BlankPage },
      { title: 'Mi espacio',icon: 'car', component: MyspacePage },
      { title: 'Mis millas', icon: 'plane',component: MilesPage }

      /*{ title: 'Soporte', icon: 'help-circle', component: NoveltyPage }*/
    ];
      this.pages2 = [
      { title: 'Home', icon: 'home',component: HomePage },
      //{ title: 'Mi Perfil', component: BlankPage },
      { title: 'Login', icon: 'key',component: LoginPage }
    ];
     this.pages3 = [
      { title: 'Home', icon: 'home',component: HomePage },
      { title: 'Mi Perfil', icon: 'person',component: BlankPage },
      { title: 'Reservar', icon: 'key',component: ReservationsPage }

      /*{ title: 'Soporte', icon: 'help-circle', component: NoveltyPage }*/
    ];
      this.pages4 = [
      { title: 'Home', icon: 'home',component: HomePage },
      { title: 'Mi Perfil', icon: 'person',component: BlankPage },
      { title: 'Mi espacio', icon: 'car',component: MyspacePage },
      { title: 'Mis millas', icon: 'plane',component: MilesPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._pushService.init_notifications();
      if(localStorage.getItem("email")!=='' && localStorage.getItem("serial")!==''){
        this.login(localStorage.getItem("email"), localStorage.getItem("serial"))
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login(email, clave) {
    console.log('Entro login automatico');
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return new Promise(
			resolve => {
				this.http.get(this.varsGlobals.urlApi + 'log/' + email + '/' + clave)
					.map(res => res.json())
					.subscribe((data1) => {
						resolve(data1);
						this.datas(data1);
						this.varsGlobals.setUserId(data1.id_usuario);
						this.varsGlobals.setUsuario(email);
				
					},
						err => {
							console.log(err);
						}
					)
			}
		);
  }
  datas(data) {
		if (!data) {
			//this.showAlert();
		} else {
			console.log(data)
			this.varsGlobals.setUserId(data.id_usuario);
			this.storage.set('iduser', data.id_usuario);
			this.varsGlobals.setbuildingId(1);//solo transelca edificio
			this.varsGlobals.setrol(data.rol);
			this.varsGlobals.setUsuario(data.nombre + " " + data.apellido)
			this.storage.set('username', data.nombre);
			this.goToHome(data.id_usuario, data.rol, data.nombre + " " + data.apellido);
		}
  }
  goToHome(id_usuario, rol, nombre) {
		this.nav.setRoot(HomePage, { id_usuario: id_usuario, rol: rol, nombre: nombre });
	}

}
