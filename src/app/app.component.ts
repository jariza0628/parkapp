import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { BuildingsPage } from '../pages/buildings/buildings';
import { MyspacePage } from '../pages/myspace/myspace';
import { LoginPage } from '../pages/login/login';

import { VarsGlobalsProvider } from '../providers/vars-globals/vars-globals';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public glo: string;
  pages: Array<{title: string, component: any}>;
  pages2: Array<{title: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public varsGlobals: VarsGlobalsProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Parqueaderos', component: BuildingsPage },
      { title: 'Mi espacio', component: MyspacePage }
     
    ];
      this.pages2 = [
      { title: 'Home', component: HomePage },
      { title: 'Parqueaderos', component: BuildingsPage },
      { title: 'Login', component: LoginPage }
      
    ];
    this.glo = "uni";

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
