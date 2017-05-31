import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicesParkProvider } from '../providers/services-park/services-park';
 
import {enableProdMode} from '@angular/core';
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
    BlankPage
    
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    BlankPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesParkProvider
  ]
})
export class AppModule {}

