import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController, NavParams, LoadingController  } from 'ionic-angular';
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
  public user: any
  public rol: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public parkService: ServicesParkProvider,
    public loading:LoadingController,
    public varsGlobals: VarsGlobalsProvider,
    public menu: MenuController,
    public  storage: IonicStorageModule,
    public platform: Platform)

  {
  	this.spacesFree = [];
    this.loader = this.loading.create({
      content: "Cargando..."
    });
    this.utilizalugar = 0;
    this.platform = platform;
    this.user = this.navParams.get('id_usuario');
    this.rol = this.navParams.get('rol');
    this.userId = this.varsGlobals.getUserId();
  }
 
  
   ionViewDidLoad() {
     this.loader.present();


         if (this.rol!=null){
           this.varsGlobals.setUserId(this.user);
           this.varsGlobals.setrol(this.rol);
           this.userId = this.varsGlobals.getUserId();
         }
        
        console.log("userid: "+this.varsGlobals.getUserId());
        console.log("rol: "+this.varsGlobals.getrol());
        if(this.varsGlobals.getrol()==2){
          this.menu.enable(false, 'menu1');
          this.menu.enable(true, 'menu2');
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
     

    console.log('ionViewDidLoad Home');
  }
  goToBlocks(bildingID) {
    this.navCtrl.push(BlocksPage, {bildingID: bildingID});
  }
  goToSpacedetail(spaceId){
    this.navCtrl.push(DetailSpacePage, {spaceId:spaceId});
  }
  unlockSpace(){
    this.parkService.unlockspace(this.userId);
    console.log('unlockSpace: '+this.userId);
  }
  exitApp(){
     this.platform.exitApp();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
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
        });
      refresher.complete();
    }, 2000);
  }
}
