import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  tagId;
  pantalla;
  valores = { caratula: null, servicio: '', totalMostrar: '', total: 0 };

  constructor(
    private mys: MyserviceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.tagId = this.mys.tagId;
    this.valores = this.mys.valores;
    this.pantalla = this.mys.pantalla;

  }

  btn1() {
    this.mys.valores.total = this.mys.valores.total + 1;
    this.mys.valores.totalMostrar = `$ ${this.mys.valores.total}.000`;
    this.mys.pantalla = 3;
    this.router.navigateByUrl('/pagina3')
  }


  btn2() {
    this.mys.valores.total = this.mys.valores.total + 2;
    this.mys.valores.totalMostrar = `$ ${this.mys.valores.total}.000`;
    this.mys.pantalla = 3;
    this.router.navigateByUrl('/pagina3')
  }


  btn5() {
    this.mys.valores.total = this.mys.valores.total + 5;
    this.mys.valores.totalMostrar = `$ ${this.mys.valores.total}.000`;
    this.mys.pantalla = 3;
    this.router.navigateByUrl('/pagina3')
  }


  btn10() {
    this.mys.valores.total = this.mys.valores.total + 10;
    this.mys.valores.totalMostrar = `$ ${this.mys.valores.total}.000`;
    this.mys.pantalla = 3;
    this.router.navigateByUrl('/pagina3')
  }

  volver() {
    this.mys.pantalla = 1;
    this.router.navigateByUrl('/home');
  }


}
