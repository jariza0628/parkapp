import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';

/*
  Generated class for the VarsGlobalsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
@Injectable()
export class VarsGlobalsProvider {
	private userId;
	private buildingId;
	private utilizalugar;
	public urlApi: string;
	private rol: any;
	private usuario: any;
	private utilizando: any;
	private id_myspace: any;//id del espacio de usuario
	constructor(public http: Http, public alertCtrl: AlertController) {
		console.log('Hello VarsGlobalsProvider Provider');
		this.userId = 0;
		this.utilizalugar = 0;
		this.rol = 0;
		this.buildingId = 1;
		// this.urlApi = "http://192.168.1.7:8888/api/";
		this.urlApi = "http://159.203.37.81/api/";
		// this.urlApi = "http://transelcapp.com/api/";
	}
	/**
	 * Obtener parametros para app
	 */
	getParameters() {
		return this.http.get(this.urlApi + 'parametros')
			.map(res => res.json())
	}
	setUserId(value) {
		this.userId = value;
	}
	getUserId() {
		return this.userId;
	}

	setIdSpace(value) {
		this.id_myspace = value;
	}
	getIdSpace() {
		return this.id_myspace;
	}

	setUsuario(value) {
		this.usuario = value;
	}
	getUsuario() {
		return this.usuario;
	}

	setrol(value) {
		this.rol = value;
	}
	getrol() {
		return this.rol;
	}

	setutilizando(value) {
		this.utilizando = value;
	}
	getutilizando() {
		return this.utilizando;
	}


	setbuildingId(value) {
		this.buildingId = value;
	}
	getbuildingId() {
		return this.buildingId;
	}


	setUtilizalugar(value) {
		this.utilizalugar = value;
	}
	getUtilizalugar() {
		return this.utilizalugar;
	}

	getOccupied(idUser) {
		return this.http.get(this.urlApi + 'SpacesOccupiedByUser/' + idUser)
			.map(res => res.json());

	}
	getOccupiedWhy(idSpace) {
		return this.http.get(this.urlApi + 'MySpacesOccupiedByUser/' + idSpace)
			.map(res => res.json());

	}
	idSpaceByuser(iduser) {
		return this.http.get(this.urlApi + 'idSpaceByuser/' + iduser)
			.map(res => res.json());
	}
	playerId(iduser, playerId) {
		let headers = new Headers;
		headers.append("content-type", "application/json");
		return this.http.post(this.urlApi + 'playerid', { iduser: iduser, playerid: playerId }, { headers: headers })
			.map((res: Response) => { console.log(res); return { status: res.status, result: res.json() } });
	}







}
