import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Printer } from '@ionic-native/printer/ngx';

import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Printer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    NFC,
    Ndef

    
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
