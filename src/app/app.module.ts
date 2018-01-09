import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuildingsPage } from '../pages/buildings/buildings';
import { BlocksPage } from '../pages/blocks/blocks';
import { FloorsPage } from '../pages/floors/floors';
import { SpacesPage } from '../pages/spaces/spaces';
import { DetailSpacePage } from '../pages/detail-space/detail-space';
import { MyspacePage } from '../pages/myspace/myspace';
import { BlankPage } from '../pages/blank/blank';
import { LoginPage } from '../pages/login/login';
import { NoveltyPage } from "../pages/novelty/novelty";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesParkProvider } from '../providers/services-park/services-park';
 
import {enableProdMode} from '@angular/core';
import { AuthProvider } from '../providers/auth/auth';
import { VarsGlobalsProvider } from '../providers/vars-globals/vars-globals';
import { CarspaceComponent } from '../components/carspace/carspace';
enableProdMode();
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BuildingsPage,
    BlocksPage,
    FloorsPage,
    DetailSpacePage,
    SpacesPage,
    MyspacePage,
    BlankPage,
    LoginPage,
    NoveltyPage,
    CarspaceComponent
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BuildingsPage,
    BlocksPage,
    FloorsPage,
    DetailSpacePage,
    SpacesPage,
    MyspacePage,
    BlankPage,
    LoginPage,
    NoveltyPage
    
  ],
  providers: [
    IonicStorageModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesParkProvider,
    AuthProvider,
    VarsGlobalsProvider
  ]
})
export class AppModule {}

