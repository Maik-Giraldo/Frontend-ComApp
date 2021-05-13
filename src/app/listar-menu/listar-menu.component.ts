import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
import { CarritoService } from '../services/carrito.service';
import { Menu, Send, Contador } from '../models/menu';

@Component({
  selector: 'app-listar-menu',
  templateUrl: './listar-menu.component.html',
  styleUrls: ['./listar-menu.component.css']
})
export class ListarMenuComponent implements OnInit {
  cont: Number = 0;
  menuArray: Menu[] = [];
  contadorArray: Contador[] = [];


  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
  ) { }

  ngOnInit(): void {

    this.menuService.getMenu()
    .subscribe(data=>{
      this.menuArray = data.data;
    },
    error =>console.log(error));
  }

  guardar(lista: []){
    var contador1;
    let send : Send = {
      menu : lista,
      id_mesa : parseInt(localStorage.getItem('id_mesa')),
    };

    this.carritoService.agregarCarrito(send)
      .subscribe(data=>{
        if(data.transaccion){

          this.cont = data.resultados_count;
        }
      })
  }

   eliminar(lista: []){
    let send : Send = {
      menu : lista,
      id_mesa : parseInt(localStorage.getItem('id_mesa')),
    };
    this.carritoService.eliminarCarrito(send)
      .subscribe(data=>{
        if(data.transaccion){

          this.cont = data.resultados_count;

        }
      })
  }
}
