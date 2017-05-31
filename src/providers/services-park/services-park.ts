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
  public urlApi: string;

  constructor(public http: Http) {
    console.log('Hello ServicesParkProvider Provider');
    //this.urlApi = "http://localhost:8888/api/";
    this.urlApi = "http://178.62.233.87:8888/api/";
  }

  getRemoteda(){
  	 return this.http.get(this.urlApi + 'buildings')
     .map(res => res.json())
  }
  
  getBlockByIdbuildind(BuildinID){
     return this.http.get(this.urlApi + 'blockByBuilding/'+BuildinID)
     .map(res => res.json())
  }
}
