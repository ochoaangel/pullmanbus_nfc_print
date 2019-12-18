import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
// import { Printer, PrintOptions, PrinterOriginal } from '@ionic-native/printer';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';



// @Component({

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  tagId;
  pantalla = 1;

  myoptions;
  contenido;

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
    private router: Router
  ) { }

  addListenNFC() {
    this.nfc.addTagDiscoveredListener()
      .pipe(take(1))
      .subscribe(data => {
        if (data && data.tag && data.tag.id) {
          this.tagId = this.nfc.bytesToHexString(data.tag.id);
          if (this.tagId) {
            // alert( parseInt(this.tagId, 16));
            let myid = ('' + parseInt(this.tagId, 16)).slice(-6);
            let myid2 = parseInt(myid, 10);
            this.valores.caratula = parseInt(myid, 10);
            console.log('this.valores.caratula', this.valores.caratula);
            console.log('this.pantalla', this.pantalla);
            if (this.pantalla === 1) {
              this.router.navigateByUrl('/pagina2');
              this.pantalla = 2;
            }

            if (this.pantalla === 3) {
              this.Imprimir2();
            }


          } else {
            alert('Tarjeta no reconocida..');
            // alert('NFC_NOT_DETECTED');
          }
        }
      });
  }





  async toast_mostrar(message: string, duration: number, color?: string, position?: any) {
    const toast = await this.toastcontroller.create({
      message,
      animated: true,
      duration,
      color,
      position
    });
    toast.present();
  }



  limpiar() {
    this.valores.caratula = null;
    this.valores.servicio = "";
    this.valores.total = 0;
    this.valores.totalMostrar = "";
  }

  Imprimir2() {

    if (!this.valores.caratula) {
      this.toast_mostrar('Ingrese Valor en la Caratula', 3000, "primary", "top");
      // } else if (!this.valores.servicio) {
      //   this.toast_mostrar('Seleccione un servicio para continuar..', 3000, "primary", "top");
    } else if (!this.valores.total) {
      this.toast_mostrar('Recuerde agregar tarifas al total..', 3000, "primary", "top");
    } else {

      this.myoptions = {
        name: 'Ticket: ' + this.valores.caratula,
      }
      this.contenido = `<div
      style="width: 290px; margin: 0px 0px 0px 0px;">
      <div style="width: 100%;"> 
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAAZAQAAAAC9Dx7BAAAC3mlDQ1BEb3QgR2FpbiAyMCUAAHicY2BgnsAABEwCDAwFRSVF7kGOkRGRUQrsNxnYGJgYeBgsGNgSk4sLfIPdQhhwgm/XGBhB9GVd3GpwAtZkoMVA+gAQG6WkFicD6S9AnF5eUgAUZ4wBskWSssHsAhA7OyTIGchuAbqapyS1AqSXwTm/oLIoMz2jREEjWVPByMDAUsE5vyg1B0QW5BcllmTm58EshNoBArwu+SUK7omZeUAtqmS4HS8AhSOEhQgfhBgCJJcWlUFYYEUCDAoMBgwODAEMiQz1DAsYjjK8YRRndGEsZVzBeI9JjCmIaQLTBWZh5kjmhcxvWCxZOlhuseqxtrLeY7Nkm8b2jT2cfTeHEkcXxxfORM4LXI5cW7g1uRfwSPFM5RXincQnzDeNX4Z/sYCOwA5BV8ErQqlCP4R7RVRE9oqGi34RmyRuJH5FokJSTvKYVL60tPQJmTJZddlbcn3yLvJ/FLYqFirpKb1VXqtSoGqi+lPtoHqXRqimkuYHrQPak3RSda30BPVe6R8xWGBYaxRjbGsib8ps+tLsgvlOiyWWE6zqrHNt4mwD7VztrR2MHXWc1JyVXBRc5d0U3JU91D11vUy8bXzcfYP9EvzzA+oDJwYtDd4VcjH0ZThThFykVVREdEXMzNg9cQ8S2BJ1k8KSG1LWpN5M58iwyMzMmpt9MZc9zz6/omBT4bti7ZKs0lVlbyr0K0uqdtUw1nrVTa1/2KjXVNN8tlWurbD9aKd0V1H36V7Vvsb+uxNtJs2e/Hdq/LTDMzRm9s/6Pidh7un55guWLhJZ3Lrk27LM5fdWhqw6vcZl7b71lhu2bTLZvGWrybbtO6x27t/tuufsvrD9Dw7mHPp5pP2Y+PEVJ61PnTuTfPbX+UkXtS8dvZJ49d/1OTdtbt29U39P+f6Jh3mPxZ7sf5b5QuTlwdf5b+XfXfjQ9Mn086uvC76H/xT4depP6z/H//8BrvkJNtP5UDIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIGSURBVHichVPBbtNAEJ11RtiHSvENDqi11B/gCJJFLPEB/AEof5CjDwiP2wsSEu0tx3xD76VsKlAlOHDgBzbkAEdHVKojOV5mduMm5sLKWo1m3sy8eTtGC/8/c4R1BEeGTTWZ1vshG0DYORDYqpxJs16BFqCBexQfSbFb7D/ADtUFFcQ9SLNn4y7P9AvV4d1ghzKji4diBZD0YdF+Ld010H3QPk3umPksZKN34jbYoahg5m9PKqAcN8+vi/Hxx1c/9cvKcPlyNr66BvWJa9FiuKITiNb5h81X0KrVh0t9C7CIQqbaCmPkF+LhWlUNV+ypwRB3sDQQmo+ooPyz56UgXTrBKgvhmrM4ol+IJ1nIXdAcRd/0SxOYw6U5uHg9vlzeRTB4wlh5j6LM31GnauCvWCR7gJCfid+WV/cz8kOo/H2NOv0GwiX94cWyCrJL5svhUYmuiK+oE8goF4LRVnjlbgPI+/CmgiqiagqiXT71AZZUC98hF+UqwwoWQlQw86KEmieJt/vhxU8AK5dp4j8smJUe6wyFYMOiTdrf6PLRZa2zx5JEp6LL0+9MMKk3AdB5EpYEzwgNuNGSXyxY63tEjqBM4den1rjdqvRGFido2D2ZMUFZHMmIWVM6RwlmoOgMshthEPJmr6gknuiAyRgFYQRYcO2RdX/IKVOu/WpbOBLW1n2b7C+ey8om+WZWIwAAAABJRU5ErkJggg==">
      </div>
      <div style="display: inline-block; width: 20%;">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQAAAAA2RLUcAAAC3mlDQ1BEb3QgR2FpbiAyMCUAAHicY2BgnsAABEwCDAwFRSVF7kGOkRGRUQrsNxnYGJgYeBgsGNgSk4sLfIPdQhhwgm/XGBhB9GVd3GpwAtZkoMVA+gAQG6WkFicD6S9AnF5eUgAUZ4wBskWSssHsAhA7OyTIGchuAbqapyS1AqSXwTm/oLIoMz2jREEjWVPByMDAUsE5vyg1B0QW5BcllmTm58EshNoBArwu+SUK7omZeUAtqmS4HS8AhSOEhQgfhBgCJJcWlUFYYEUCDAoMBgwODAEMiQz1DAsYjjK8YRRndGEsZVzBeI9JjCmIaQLTBWZh5kjmhcxvWCxZOlhuseqxtrLeY7Nkm8b2jT2cfTeHEkcXxxfORM4LXI5cW7g1uRfwSPFM5RXincQnzDeNX4Z/sYCOwA5BV8ErQqlCP4R7RVRE9oqGi34RmyRuJH5FokJSTvKYVL60tPQJmTJZddlbcn3yLvJ/FLYqFirpKb1VXqtSoGqi+lPtoHqXRqimkuYHrQPak3RSda30BPVe6R8xWGBYaxRjbGsib8ps+tLsgvlOiyWWE6zqrHNt4mwD7VztrR2MHXWc1JyVXBRc5d0U3JU91D11vUy8bXzcfYP9EvzzA+oDJwYtDd4VcjH0ZThThFykVVREdEXMzNg9cQ8S2BJ1k8KSG1LWpN5M58iwyMzMmpt9MZc9zz6/omBT4bti7ZKs0lVlbyr0K0uqdtUw1nrVTa1/2KjXVNN8tlWurbD9aKd0V1H36V7Vvsb+uxNtJs2e/Hdq/LTDMzRm9s/6Pidh7un55guWLhJZ3Lrk27LM5fdWhqw6vcZl7b71lhu2bTLZvGWrybbtO6x27t/tuufsvrD9Dw7mHPp5pP2Y+PEVJ61PnTuTfPbX+UkXtS8dvZJ49d/1OTdtbt29U39P+f6Jh3mPxZ7sf5b5QuTlwdf5b+XfXfjQ9Mn086uvC76H/xT4depP6z/H//8BrvkJNtP5UDIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADPSURBVHicTdAxCsIwFAbgvzTgEmhW965CigERKuYAgsdwFVy9gjfwEoKr0GIWQTHgJPQKhRYCLg1xEJO85fHx8h7kJ0h5ZRkIfkWWZ7YyLvHuJQ4bEubAoH/9b2liZ2dNcxr2a8ZhdZg7GL13tfdC8bQptPfHWWhReR/Fu8ufhbe4TQ3tw70WEmoI1mt+2C3Cfmn67auX3oriamcPb3rKiOXh/RQF5TbcS9J5JxoZ5TOu6UTF+Wx1VkV55MBFRL6PBhHng1ZFedWshLr7/30B/8lHFdrc/+4AAAAASUVORK5CYII=">
      </div>
      <div style="display: inline-block;  text-align: left;">
      <div>Número de caratula:<strong>${ this.valores.caratula}</strong></div>
      <div>Fecha:<strong>${ new Date().toLocaleString()}</strong></div>
        <div style="text-align: right;padding: 0 5px;">Total:<strong>${ this.valores.totalMostrar}</strong></div>
      </div>
    </div>`;


      this.printer.print(this.contenido, this.myoptions)
        .then(succes => {

          this.limpiar();
          this.toast_mostrar('Estamos a su servicio..', 4000, "primary", "top");
          this.limpiar();
          this.pantalla=1;
          this.router.navigateByUrl('/home')
        }, error => {
          this.toast_mostrar('Hubo un error, intente nuevamente..', 4000, "primary", "top");
          this.limpiar();
          this.pantalla=1;
          this.router.navigateByUrl('/home')
        });

    }

  }



























}
