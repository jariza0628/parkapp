import { Injectable } from '@angular/core';
import {Http, Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServicesParkProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServicesParkProvider {
  public urlApi: string;
  public data1: any;

  constructor(public http: Http) {
    console.log('Hello ServicesParkProvider Provider');
    this.urlApi = "http://localhost:8888/api/";
    // this.urlApi = "http://transelcapp.com/api/";
  }
  getHourNow() {
    return this.http.get(this.urlApi + 'timenow')
      .map(res => res.json())
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
     getUser(UserId){
     return this.http.get(this.urlApi + 'User/'+UserId)
     .map(res => res.json())
  }
    getMd5(pass){
     return this.http.get(this.urlApi + 'md5/'+pass)
     .map(res => res.json())
  }
    getDaysFreeByUser(idUser){
     return this.http.get(this.urlApi + 'daysFreeByUser/'+idUser)
     .map(res => res.json())
  }
  getSpaceOccupiedForMe(idUser){
     return this.http.get(this.urlApi + 'SpaceOccupiedForMe/'+idUser)
     .map(res => res.json())
  }
   freeSpace(info){//recibe un string con 2 fechas y el usuario se separa con php en el servidor
      return new Promise(
      resolve=>{
        this.http.get(this.urlApi + 'freeSpace/'+info, ).map(res => res.json()).subscribe((data1) => {
                 this.data1 = data1;
                 resolve(this.data1);
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
   DelFreeSpace(idcalendar, fecha){
    return new Promise(
      resolve=>{
        this.http.delete(this.urlApi + 'FreeDayByUser/delete/'+idcalendar+'/'+fecha)
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

  deletecalendar(idcalendar, fecha){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.urlApi + 'FreeDayByUser/delete/'+idcalendar+'/'+fecha, options).map(res => res.json())
  }

  postNovedad(id_user, titulo, descripcion) {
    let headers = new Headers;
    headers.append("content-type", "application/json");
    return this.http.post(this.urlApi + 'novelty', { titulo: titulo, descripcion: descripcion, iduser: id_user }, { headers: headers })
      .map((res: Response) => { console.log(res); return { status: res.status, result: res.json() } });
  }
  getNovedad(idUser) {
    return this.http.get(this.urlApi + 'novelty/' + idUser)
    .map(res => res.json())
    
  }
  deleteNovedad(idnovedad){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.urlApi + 'novelty/' + idnovedad, options).map(res => res.json())
  }
  //Respuestas Servicios
  getAnswer(idnovedad) {
    return this.http.get(this.urlApi + 'answerByNoveltyd/' + idnovedad)
      .map(res => res.json())
  }
  deleteAnswer(idAnswer) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.urlApi + 'answer/' + idAnswer, options).map(res => res.json())
  }
  postAnswer(idNovedad, Repuesta, quien) {
    let headers = new Headers;
    headers.append("content-type", "application/json");
    return this.http.post(this.urlApi + 'novelty', { titulo: Repuesta, id: idNovedad, quien_responde:quien}, { headers: headers })
      .map((res: Response) => { console.log(res); return { status: res.status, result: res.json() } });
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

   cambiarcontrasena(id_usuario,clave){
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');

    let body = JSON.stringify({
        id_usuario: id_usuario,
        clave: clave
    });

 return new Promise(
      resolve=>{
        this.http.put(this.urlApi + 'updatepass/'+id_usuario, JSON.parse(body), {headers: headers})
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
