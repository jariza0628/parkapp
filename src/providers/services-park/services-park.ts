import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
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
    //this.urlApi = "http://slimapp/api/";
    this.urlApi = "http://www.parkapp.me/api/";
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
  getNumSpaceFreeToday(IdBuilding){
    return this.http.get(this.urlApi + 'freeSpacesByBuilding/'+IdBuilding)
    .map(res => res.json())
  }

   getNumSpace(IdBuilding){
    return this.http.get(this.urlApi + 'SpacesByBuilding/'+IdBuilding)
    .map(res => res.json())
  }
   getSpacesWhithCalendarFree(spaceId){
     return this.http.get(this.urlApi + 'SpacesWhithCalendarFree/'+spaceId)
     .map(res => res.json())
  }
    getDaysFreeByUser(idUser){
     return this.http.get(this.urlApi + 'daysFreeByUser/'+idUser)
     .map(res => res.json())
  }
   freeSpace(info){//recibe un string con 2 fechas y el usuario se separa con php en el servidor
     return new Promise(
      resolve=>{
        this.http.get(this.urlApi + 'freeSpace/'+info)
        .map(res => res.json())
        .subscribe((data1) => {
                 resolve(data1)
          },
          err=>{
            console.log(err);
          }
        )
      }
    );
   
  }
 
   unlockspace(spaceId){
    return new Promise(
      resolve=>{
        this.http.delete(this.urlApi + 'delSpaceTmp/delete/'+spaceId)
        .map(res => res.json())
        .subscribe((data1) => {
                 resolve(data1)
          },
          err=>{
            console.log(err);
          }
        )
      }
    );
  }
   DelFreeSpace(idcalendar){
    return new Promise(
      resolve=>{
        this.http.delete(this.urlApi + 'FreeDayByUser/delete/'+idcalendar)
        .map(res => res.json())
        .subscribe((data1) => {
                 resolve(data1)
          },
          err=>{
            console.log(err);
          }
        )
      }
    );
  }
  sendinfo(iduser,id){
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({
        iduser: iduser,
        id: id
    });

 return new Promise(
      resolve=>{
        this.http.post(this.urlApi + 'save/space', JSON.parse(body), {headers: headers})
     .map(res => res.json())
        .subscribe((data1) => {
                 resolve(data1)
          },
          err=>{
            console.log(err);
          }
        )
      }
    );
  }
}
