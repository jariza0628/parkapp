import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

   userName: string;
   loggedIn: boolean;
   url = 'http://localhost:8000/auth';

  constructor(public http: Http) {
  	this.userName = '';
    this.loggedIn = false;
    console.log('Hello AuthProvider Provider');
  }
/*
  login(
    ) {
      let url = `${this.url}/login`;
      let iJon = JSON.stringify(userInfo);

      return this.http.post(url, iJon, {
         headers: new Headers({
            'Content-Type':'application/json'
         })
      })
      .map(res => res.text())
      .map(res => {
         if (res=="error" || res=="nofound"){
            this.loggedIn = false;
         } else {
            localStorage.setItem('token', res);
            this.userName = userInfo.user;
            this.loggedIn = true;
         }
         return this.loggedIn;
      });
   }*/

}
