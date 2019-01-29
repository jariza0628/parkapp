import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ReservationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReservationsProvider {
  public urlApi: string;

  constructor(public http: Http) {
    console.log('Hello ReservationsProvider Provider');
    //this.urlApi = "http://slimapp/api/";
    this.urlApi = "http://transelcapp.com/api/";
  }
  /**
   * get 
   */
  getAllReservatios() {
    return this.http.get(this.urlApi + 'reservations/')
      .map(res => res.json())
  }
  /**
   * Obtener por id usuario
   * @param id 
   */
  getReservationsByUser(id) {
    return this.http.get(this.urlApi + 'reservations/' + id)
      .map(res => res.json())
  }
  /**
   * Eliminar reservation
   * @param id 
   */
  deleteReservation(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.urlApi + 'reservations/' + id, options).map(res => res.json())
  }
  newReservation(jornada, id_user) {
    let headers = new Headers;
    headers.append("content-type", "application/json");
   return this.http.post(this.urlApi + 'reservations', { jornada: jornada, iduser: id_user }, { headers: headers })
      .map((res: Response) => { console.log(res); return { status: res.status, result: res.json() } });
 
  }

}
