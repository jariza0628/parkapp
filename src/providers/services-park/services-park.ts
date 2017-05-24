import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServicesParkProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServicesParkProvider {

  constructor(public http: Http) {
    console.log('Hello ServicesParkProvider Provider');
  }

  getRemoteda(){
  	this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=10&sort=hot').subscribe(data =>{
  		console.log(data);
  	});
  }

}
