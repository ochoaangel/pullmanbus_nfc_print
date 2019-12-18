import { Component, OnInit } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MyserviceService } from '../service/myservice.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  esValido = false;
  isloading = false;
  loading: any;     //para almacenar funcionamiento de la funcion loading
  contenido = '';
  myoptions;

  pantalla = 1;

  tagId;
  scanned;

  valores = { caratula: null, servicio: '', totalMostrar: '', total: 0 };


  constructor(
    private printer: Printer,
    public toastcontroller: ToastController,
    public loadingCtrl: LoadingController,
    private splashScreen: SplashScreen,
    private nfc: NFC,
    private ndef: Ndef,
    public platform: Platform,
    private toastCtrl: ToastController,
    private router: Router,
    private mys: MyserviceService,

  ) {  }


  ngOnInit() {
    this.splashScreen.hide();

  } // fin ngOnInit

  ionViewDidEnter() {
    this.mys.addListenNFC();
  }


  addListenNFC() {
    this.nfc.addTagDiscoveredListener()
      .pipe(take(1))
      .subscribe(data => {
        if (data && data.tag && data.tag.id) {
          this.tagId = this.nfc.bytesToHexString(data.tag.id);
          if (this.tagId) {
            let myid = ('' + parseInt(this.tagId, 16)).slice(-6);
            let myid2 = parseInt(myid, 10);
            this.valores.caratula = parseInt(myid, 10);
            this.pantalla = this.pantalla + 1;
            console.log('this.valores.caratula', this.valores.caratula);
            console.log('this.pantalla', this.pantalla);
            this.router.navigateByUrl('/pagina2');
          } else {
            alert('Tarjeta no reconocida..');
          }
        }
      });
  }


}


