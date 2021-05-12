import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../models/carrito';
import { MenuService } from '../services/menu.service';
import { CarritoService } from '../services/carrito.service';
import { Menu, Send } from '../models/menu';


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
  ) { }

  ngOnInit(): void {

    this.menuService.getCarrito()
    .subscribe(data=>{
      console.log(data)
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
}
