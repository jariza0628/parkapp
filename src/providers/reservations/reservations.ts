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
    //this.urlApi = "http://192.168.100.178:8888/api/";
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
 * Obtener por id usuario las reservas asignandas 
 * @param id 
 */
  getReservationsNowByUser(id) {
    return this.http.get(this.urlApi + 'reservations/asg/' + id)
      .map(res => res.json())
  }
  /**
  * Obtine el numero de reservas asignadas
  */
  getNumberReservations() {
    return this.http.get(this.urlApi + 'reservationsnumber')
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
  /****** Millas */
  /** Milas por usuerio */
  getMilesById(id) {
    return this.http.get(this.urlApi + 'miles/detail/' + id)
      .map(res => res.json())
  }
  getMilesTotals(id) {
    return this.http.get(this.urlApi + 'miles/' + id)
      .map(res => res.json())
  }

  getMilesHistory(id) {
    return this.http.get(this.urlApi + 'miles/history/' + id)
      .map(res => res.json())
  }
  getReservationAfter() {

  }
  /**
   * Traer los epsacion asigandos a mi reserva por id_user
   */
 

}
