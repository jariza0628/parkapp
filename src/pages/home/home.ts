import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams, LoadingController,AlertController  } from 'ionic-angular';
import { BlocksPage } from '../blocks/blocks';
import { ServicesParkProvider } from '../../providers/services-park/services-park';
import { VarsGlobalsProvider } from '../../providers/vars-globals/vars-globals';
import { DetailSpacePage } from '../detail-space/detail-space';
import { IonicStorageModule } from '@ionic/storage';
import {Platform} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ServicesParkProvider]
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
  public nombre:any;
  public utlizando:any;
  public userutilizaspace: any;
  public id_space: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public parkService: ServicesParkProvider,
    public loading:LoadingController,
    public varsGlobals: VarsGlobalsProvider,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public  storage: IonicStorageModule,
    public platform: Platform)

  {
  	this.spacesFree = [];
    this.userutilizaspace =[];
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
    this.utlizando = this.navParams.get('utlizando');
  }
 
  
   ionViewDidLoad() {
     this.loader.present();
       this.services();
     

    console.log('ionViewDidLoad Home');
  }

  services(){
     //mostrar varibles
     this.userutilizaspace = null;
    this.varsGlobals.setUsuario(this.nombre);
    this.nombre = this.varsGlobals.getUsuario();
    console.log("nombre:"+this.nombre);
    console.log("userid: "+this.varsGlobals.getUserId());
    console.log("rol: "+this.varsGlobals.getrol());
    console.log("utilizando park: "+this.utlizando);
    //fin mostrar variables
    if (this.rol!=null){
      this.varsGlobals.setUserId(this.user);
      this.varsGlobals.setrol(this.rol);

      this.userId = this.varsGlobals.getUserId();
    }
    if(this.varsGlobals.getrol()==2 ){//si es dueño de parqueadero mostrar mi espacio en menu
      this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu3');
      this.menu.enable(true, 'menu2');

         this.varsGlobals.idSpaceByuser(this.user).subscribe(
          data => {
            this.id_space = data.id_espacio;
            if(this.id_space!=null){
              this.varsGlobals.setIdSpace(this.id_space);
            }
            

          }
         );
          setTimeout(() => {
           
                if(this.id_space==null){
                  this.id_space = this.varsGlobals.getIdSpace();
                }
                console.log("id space mio: "+this.id_space);
               this.varsGlobals.getOccupiedWhy(this.id_space).subscribe(
                data => {
                  this.userutilizaspace = data.nombre;
                  console.log(this.userutilizaspace);
                } );
          }, 500);
        
        
      
    }
    if(this.varsGlobals.getrol()==3 ){//si es dueño de parqueadero mostrar mi espacio en menu
      this.menu.enable(false, 'menu1');
      this.menu.enable(false, 'menu2');
      this.menu.enable(true, 'menu3');
    }
    if(this.varsGlobals.getrol()==3){
      if(this.utlizando=='si'){//
        this.utlizando = this.varsGlobals.setutilizando("si");
      }
    }
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
      }
      );
 
    this.parkService.getSpaceFreeToday().subscribe(
      data => {
        this.spacesFree = (data);
        console.log(this.spacesFree);
        this.loader.dismiss();
      }

      );
  }
  goToBlocks(bildingID) {
    this.navCtrl.push(BlocksPage, {bildingID: bildingID});
  }
  goToSpacedetail(spaceId){
    this.navCtrl.push(DetailSpacePage, {spaceId:spaceId});
  }
  unlockSpace(){
    this.parkService.unlockspace(this.userId);
    this.showAlert();
    this.refresh();
    console.log('unlockSpace: '+this.userId);
  }
  exitApp(){
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
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
        this.services();
      refresher.complete();
    }, 2000);
  }
  refresh() {
  

    setTimeout(() => {
      console.log('Async operation has ended');
        this.services();
    
    }, 1300);
  }
}
