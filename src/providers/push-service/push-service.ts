import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

/*
  Generated class for the PushServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PushServiceProvider {
  one_id: any;
  constructor(private oneSignal: OneSignal, public platform: Platform) {
    console.log('Hello PushServiceProvider Provider');
    this.init_notifications();
    
  }
  init_notifications() {
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('c5d67ed6-d117-4987-88c3-4b7dc45f2ba8', '48219545924');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
        console.log('Notificacion recivida');
      });
      this.oneSignal.getIds().then(ids => {//player id del celular
        this.one_id = ids.userId;
        sessionStorage.setItem('idPlayer', this.one_id);
        console.log("Entro one promesa");
        console.log(this.one_id);
      })
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        console.log('Notificacion abierta');
      });
      this.oneSignal.endInit();
    } else {
      console.log('No corre en el navedador');
    }
  }
 
}
