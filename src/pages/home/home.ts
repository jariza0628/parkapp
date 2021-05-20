import { Component } from '@angular/core';
import {
  IonicPage, NavController, MenuController,
  NavParams, LoadingController, AlertController, ModalController
} from 'ionic-angular';
import { BlocksPage } from '../blocks/blocks';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
import { DetailSpacePage } from '../detail-space/detail-space';
import { IonicStorageModule } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ReservationsProvider } from '../../providers/reservations/reservations';
import { ModalJornadaPage } from '../modal-jornada/modal-jornada';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ServicesParkProvider, ReservationsProvider]
})
export class HomePage {
  public spacesFree: any;
  public numSpaceFree: any;
  public numSpace: any;
  public loader: any;
  public utilizalugar: any;
  public userId: any;
  public user: any;
  public rol: any;
  public usuario: any;
  public nombre: any;
  public nombre2: any;
  public utlizando: any;
  public userutilizaspace: any;
  public id_space: any;
  public SpaceOccupiedForMe: any;
  public so: any;
  public color: string;
  public hora: string;
  reservas_actuales: any;
  num_reservas: any;
  userLocalStorage: any;
  roluser: any;
  //Parametros
  parametros: any;
  hoy: String;
  man: String;
  myspace: any;
  public dia: string;
  public mes: string;
  public anio: number;
  public dia2: string;
  public mes2: string;
  public anio2: number;
  public myDate: string;
  public myDate2: string;
  public fechaenviada: string;
  public jornada: string;
  public userID: string;
  localSuser: any;
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public parkService: ServicesParkProvider,
    public loading: LoadingController,
    public varsGlobals: VarsGlobalsProvider,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public storage: IonicStorageModule,
    public platform: Platform,
    private _ReservationsProvider: ReservationsProvider

  ) {
    this.spacesFree = [];
    this.userutilizaspace = [];
    this.loader = this.loading.create({
      content: "Cargando..."
    });
    this.utilizalugar = 0;
    this.platform = platform;
    this.user = this.navParams.get('id_usuario');
    this.rol = this.navParams.get('rol');
    this.rol = this.navParams.get('rol');
    this.userId = this.varsGlobals.getUserId();
    this.nombre = this.navParams.get('nombre');
    this.nombre2 = this.varsGlobals.getUsuario();
    this.utlizando = this.navParams.get('utlizando');
    this.SpaceOccupiedForMe = "";
    this.color = "gray";
    this.hora = "";
    // Reservas actuales
    this.reservas_actuales = [];
    //*** */
    this.localSuser = localStorage.getItem('id_usuario')
    platform.ready().then(() => {
      console.log("device!");
      if (this.platform.is('android')) {
        console.log("running on Android device!");
      }
      if (this.platform.is('ios')) {
        console.log("running on iOS device!");
        this.so = 'ios';
      }
      if (this.platform.is('mobileweb')) {
        console.log("running in a browser on mobile!");
      }

    });
    this.parametros = [
      {
        "id_parametros": "1",
        "hora_asignacion": "8",
        "hora_reservas": "8",
        "modo_liberacion": "NO",
        "millas": "SI"
      }
    ]
    this.userLocalStorage = false;
    this.roluser = sessionStorage.getItem('rol');
  }


  ionViewDidLoad() {
    this.loader.present();
    this.services();
    this.getNumberReservasAsg();
    console.log('ionViewDidLoad Home');


  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ModalJornadaPage, { userId: 8675309 });
    profileModal.present();
  }

  chageOp() {
    console.log('change OP', this.hoy);

  }

  loadParametros() {
    this.varsGlobals.getParameters().subscribe(
      data => {
        console.log(data);
        this.parametros = data;
        sessionStorage.setItem('parametros', JSON.stringify(this.parametros));
      },
      err => {
        console.log(err);

      }
    )
  }

  services() {
    if (localStorage.getItem('id_usuario')) {
      this.userLocalStorage = true;
    }
    this.loadParametros();

    if (sessionStorage.getItem('parametros')) {
      this.parametros = JSON.parse(sessionStorage.getItem('parametros'));
      console.log('home parametros ', this.parametros);
    } else {
      console.log('No se cargaron parametros');

    }
    this.roluser = sessionStorage.getItem('rol');
    //mostrar varibles
    this.userutilizaspace = null;
    this.getReservatiosNow();
    this.getMyspace();
    //fin mostrar variables
    if (this.rol != null) {
      this.varsGlobals.setUserId(this.user);
      this.varsGlobals.setrol(this.rol);
      this.varsGlobals.setUsuario(this.nombre);
      this.userId = this.varsGlobals.getUserId();
      this.nombre2 = this.varsGlobals.getUsuario();
      if (this.nombre != null) {
        this.getNombreuser(this.userId);
      }
    }
    console.log("nombre:" + this.nombre);
    console.log("userid: " + this.varsGlobals.getUserId());
    console.log("rol: " + this.varsGlobals.getrol());
    if (this.varsGlobals.getrol() == 2) {//si es dueño de parqueadero mostrar mi espacio en menu
      this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu3');
      this.menu.enable(false, 'menu4');
      this.menu.enable(true, 'menu2');
      this.utilizansospace();
      this.getNombreuser(this.userId);
    }
    if (this.varsGlobals.getrol() == 3) {//si es dueño de parqueadero mostrar mi espacio en menu
      this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu2');
      this.menu.enable(false, 'menu4');
      this.menu.enable(true, 'menu3');
      this.getNombreuser(this.userId);
    }
    if (this.varsGlobals.getrol() == 4) {//si es dueño de parqueadero mostrar mi espacio en menu
      this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu2');
      this.menu.enable(true, 'menu4');
      this.menu.enable(false, 'menu3');
      this.utilizansospace();
      this.getNombreuser(this.userId);
    }
    if (this.varsGlobals.getrol() == 3 || this.varsGlobals.getrol() == 4) {
      if (this.utlizando == 'si') {//
        this.utlizando = this.varsGlobals.setutilizando("si");
      }
      setTimeout(() => {
        this.SpaceOccupiedForMeUser(this.userId);
        this.getNombreuser(this.userId);
      }, 500);

    }
    console.log("utilizando park: " + this.utlizando);
    this.parkService.getNumSpaceFreeToday(1).subscribe(
      data => {
        this.numSpaceFree = (data.ESPACIOSLIBRESHOY);
        console.log(this.numSpaceFree);
      }
    );
    this.parkService.getNumSpace(1).subscribe(
      data => {
        this.numSpace = (data.totalEspacios);
        console.log(this.numSpace);
      }
    );
    this.varsGlobals.getOccupied(this.userId).subscribe(
      data => {
        this.varsGlobals.setUtilizalugar(data.ocupado);
        this.utilizalugar = this.varsGlobals.getUtilizalugar();
        console.log("utilizalugar", this.utilizalugar);

      }
    );

    this.parkService.getSpaceFreeToday().subscribe(
      data => {
        this.spacesFree = (data);

        console.log(this.spacesFree);

        console.log(data.hora);

        this.loader.dismiss();
      }

    );
  }
  goToBlocks(bildingID) {
    this.navCtrl.push(BlocksPage, { bildingID: bildingID });
  }
  goToSpacedetail(spaceId) {
    this.navCtrl.push(DetailSpacePage, { spaceId: spaceId });
  }
  getMyspace(){
    this.parkService.getMyspaceByIduser(this.localSuser).subscribe(
      data => {
        console.log('Mi espacios', data);
        this.myspace = data.numero;
      }
    )
  }
  SpaceOccupiedForMeUser(iduser) {//que espacio ocupo rol 3 y 4
    this.parkService.getSpaceOccupiedForMe(this.userId).subscribe(
      data => {
        this.SpaceOccupiedForMe = data.numero;
        console.log("SpaceOccupiedForMeUser " + this.SpaceOccupiedForMe);
      }
    );
  }
  /**
   * Reservas asignada al usuario
   */
  getReservatiosNow() {

    let id_user;
    id_user = localStorage.getItem('id_usuario');
    this._ReservationsProvider.getReservationsNowByUser(id_user).subscribe(
      data => {
        console.log('getReservatiosNow', data);
        if (data.message) {
          this.reservas_actuales = null;
        } else {
          data.forEach(element => {
            if (element.ocupado_m === id_user) {
              this.reservas_actuales.push({ 'numero_espacio': element.numero_espacio, 'jornada': 'Mañana' })
            }
            if (element.ocupado_t === id_user) {
              this.reservas_actuales.push({ 'numero_espacio': element.numero_espacio, 'jornada': 'Tarde' })
            }
            if (element.ocupado_dia === id_user) {
              this.reservas_actuales.push({ 'numero_espacio': element.numero_espacio, 'jornada': 'Dia' })
            }
          });
        }
      }, err => {
        console.log(err);
      }
    )
  }
  getNumberReservasAsg() {
    this._ReservationsProvider.getNumberReservations().subscribe(
      data => {
        this.num_reservas = data[0].total;
        console.log('num reservatiosn', this.num_reservas);
      },
      err => {
        console.log(err);

      }
    )

  }
  getNombreuser(iduser) {//que espacio ocupo rol 3 y 4
    this.parkService.getUser(iduser).subscribe(
      data => {
        this.nombre = data.nombre + " " + data.apellido;
        console.log("nombre service " + this.nombre);
      }
    );
  }
  utilizansospace() {
    this.varsGlobals.idSpaceByuser(this.user).subscribe(
      data => {
        this.id_space = data.id_espacio;
        if (this.id_space != null) {
          this.varsGlobals.setIdSpace(this.id_space);
        }
      }
    );
    setTimeout(() => {

      if (this.id_space == null) {
        this.id_space = this.varsGlobals.getIdSpace();
      }
      console.log("id space mio: " + this.id_space);
      this.varsGlobals.getOccupiedWhy(this.id_space).subscribe(
        data => {
          this.userutilizaspace = data.nombre;
          console.log(this.userutilizaspace);
        });
    }, 500);
  }
  unlockSpace() {
    this.parkService.unlockspace(this.userId);
    this.showAlert();
    this.refresh();
    console.log('unlockSpace: ' + this.userId);
  }
  exitApp() {
    this.logOut();
    localStorage.removeItem('serial');
    localStorage.removeItem('email');
    localStorage.removeItem('id_usuario');
    this.platform.exitApp();
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Listo!!',
      subTitle: 'puesto Liberado',
      buttons: ['OK']
    });
    alert.present();
  }
  doRefresh(refresher) {
    this.reservas_actuales = null;
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.services();
      refresher.complete();
    }, 2000);
  }
  logOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('serial');
    localStorage.removeItem('id_usuario');

  }


  guardarLiberacion(jornada, sumdias: number) {
    let mm: string;
    let dd: string;
    //  20190626-20190626-107-0 formato de liberacion 
    let hoy = new Date();
    dd = String(hoy.getDate() + sumdias);
    mm = String(hoy.getMonth() + 1);
    let yyyy = hoy.getFullYear();

    console.log('fecha: dia ' + dd + 'mes ' + mm + 'añi' + yyyy);

    if (mm.length == 1) {
      mm = "0" + mm;
    }
    if (dd.length == 1) {
      dd = "0" + dd;
    }
    this.anio = yyyy;
    this.mes = mm;
    this.dia = dd;
    this.anio2 = yyyy;
    this.mes2 = mm;
    this.dia2 = dd;
    this.jornada = jornada;
    if (this.varsGlobals.getUserId().length == 1) {
      this.userID = "00" + this.varsGlobals.getUserId();
    }
    if (this.varsGlobals.getUserId().length == 2) {
      this.userID = "0" + this.varsGlobals.getUserId();
    }
    if (this.varsGlobals.getUserId().length == 3) {
      this.userID = this.varsGlobals.getUserId();
    }
    this.fechaenviada = this.anio + "" + this.mes + "" + this.dia + "-" + this.anio2 + "" + this.mes2 + "" + this.dia2 + "-" + this.userID + "-" + this.jornada;
    console.log(this.fechaenviada);
    this.parkService.freeSpace(this.fechaenviada);
  }

  refresh() {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.services();

    }, 1300);
  }
}
function trim(cadena) {
  return cadena.replace(" ", "")
}