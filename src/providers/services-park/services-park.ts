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
    this.urlApi = "http://slimapp/api/";
    //this.urlApi = "http://178.62.233.87:8888/api/";
  }

  getRemoteda(){
  	 return this.http.get(this.urlApi + 'buildings')
     .map(res => res.json())
  }
   getSpaceFreeToday(){
     return this.http.get(this.urlApi + 'freeSpaces')
     .map(res => res.json())
  }
  
  getBlockByIdbuildind(BuildinID){
     return this.http.get(this.urlApi + 'blockByBuilding/'+BuildinID)
     .map(res => res.json())
  }

   getFloors(blockID){
     return this.http.get(this.urlApi + 'floorByIdBlock/'+blockID)
     .map(res => res.json())
  }
  getSpacesByfloorId(FloorId){
     return this.http.get(this.urlApi + 'spaceByfloorId/'+FloorId)
     .map(res => res.json())
  }
  getSpace(SpaceID){
    return this.http.get(this.urlApi + 'space/'+SpaceID)
    .map(res => res.json())
  }
}
