import { Component, OnInit } from '@angular/core';
import { PersonalCocina, Pedido} from '../models/personal-cocina';
import { MenuService } from '../services/menu.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-personal-cocina',
  templateUrl: './personal-cocina.component.html',
  styleUrls: ['./personal-cocina.component.css']
})



export class PersonalCocinaComponent implements OnInit {
  panelOpenState = false;
  pedidos: PersonalCocina[] = []
  detalle: boolean = false;
  load: boolean = true;
  contador : number = 0;

  handleSearch(value: string) {
    console.log(value);
    this.filtro_valor = value;
    var dateDay = new Date().toString();
  }

  handleSearch2(value: string) {
    console.log(value);
    this.filtro_tipo = value;
  }



  tipo = new FormControl('')
  search = new FormControl('')


  filtro_valor = ''
  filtro_tipo = ''
  constructor(
    private menuService: MenuService,
  ) {

  }

  ngOnInit(): void {
    this.menuService.getFaturas()
    .subscribe(data=>{
      this.pedidos = data.data;
    },
    error =>console.log(error));
    setInterval(() => {
      this.menuService.getFaturas()
    .subscribe(data=>{
      this.pedidos = data.data;
      this.contador = this.pedidos.reduce((acc, pedido) => {
        if(pedido.estado == "pendiente"){
          acc++;
        }
        return acc
      },0)
    },
    error =>console.log(error));
    },5000)
  }

  confirmar(lista: []) {


    this.menuService.confirmarCocina(lista)
    .subscribe(data=>{

      Swal.fire({
        toast : true,
        icon: 'success',
        title: 'Pedido confirmado correctamente',
        text: 'El pedido empezará a ser realizado en cocina, se le notificará al comensal',
        footer: 'Culminada la preparación del pedido, finalízalo en la aplicación!',
        showConfirmButton: true,
        confirmButtonText: `Ok`
      }).then(() => {
        this.menuService.getFaturas()
        .subscribe(data=>{
          this.pedidos = data.data;
        },
        error =>console.log(error));
      })
    },

    error =>console.log(error));
  }

  finalizar(lista: []){
    this.load = false;
    this.menuService.finalizarCocina(lista)
    .subscribe(data=>{
      this.load = true;
      Swal.fire({
        toast : true,
        icon: 'success',
        title: 'Pedido Finalizado correctamente',
        text: 'Se culmino la preparacion del pedido',
        footer: 'podras ver la factura de este pedido en el apartado "Facturas"',
        showConfirmButton: true,
        confirmButtonText: `Ok`
      }).then(()=>{
        this.menuService.getFaturas()
        .subscribe(data=>{
          this.pedidos = data.data;
        },
        error =>console.log(error));
      })
    },

    error =>console.log(error));
  }

  rechazar(lista: []){


    this.menuService.rechazarCocina(lista)
    .subscribe(data=>{

      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Pedido Rechazado correctamente',
        text: 'Se le notificara al comensal',
        footer: 'Informarle al comensal por que no se puedo realizar su pedido',
        showConfirmButton: true,
        confirmButtonText: `Ok`
      }).then(() => {
        this.menuService.getFaturas()
        .subscribe(data=>{
          this.pedidos = data.data;
        },
        error =>console.log(error));
      })
    },

    error =>console.log(error));
  }


}
