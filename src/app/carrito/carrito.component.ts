import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';
import { Menu, Send, Sendid } from '../models/menu';
import { ClientService } from '../services/client.service';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoArray: Carrito[] = [];

  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {

    this.menuService.getCarrito()
    .subscribe(data=>{

      this.carritoArray = data.data;
    },
    error =>console.log(error));
  }

  eliminar(lista: []){
    let send : Send = {
      menu : lista,
      id_mesa : parseInt(localStorage.getItem('id_mesa')),
    };
    this.carritoService.eliminarCarrito(send)
      .subscribe(data=>{
        if(data.transaccion){
          window.location.reload();
        }
      })
  }


  id_mesa:number
  load: boolean = true;


  rechazar(){

    let sendid  : Sendid = {

      id_mesa : parseInt(localStorage.getItem('id_mesa')),
    };

    this.carritoService.rechazarPedido(sendid)
    .subscribe(data=>{
      if(data.transaccion){
      }


      Swal.fire({
        icon: 'success',
        title: 'pedido rechazado correctamente',
        showConfirmButton: true,
        confirmButtonText: `Ok`
      }).then((result) => {
        //Read more about isConfirmed, isDenied below
        if (result.isConfirmed) {
          this.route.navigate( ['/'])
        }
      })

    })

  }


  aceptar(){

    let sendid  : Sendid = {

      id_mesa : parseInt(localStorage.getItem('id_mesa')),
    };

    this.carritoService.aceptarPedido(sendid)
    .subscribe(
      data=>{
      if(data.transaccion){
      }

      Swal.fire({
        icon: 'success',
        title: 'pedido aceptado correctamente',
        showConfirmButton: true,
        confirmButtonText: `Ok`
      }).then((result) => {
        //Read more about isConfirmed, isDenied below
        if (result.isConfirmed) {
          this.route.navigate( ['/'])
        }
      })


    })

  }
}





