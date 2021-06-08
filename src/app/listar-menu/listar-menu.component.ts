import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
import { CarritoService } from '../services/carrito.service';
import { Menu, Send, Contador } from '../models/menu';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CarritoGuardService } from '../services/carrito-guard.service';



@Component({
  selector: 'app-listar-menu',
  templateUrl: './listar-menu.component.html',
  styleUrls: ['./listar-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ListarMenuComponent implements OnInit {
  cont: Number = 0;
  menuArray: Menu[] = [];
  contadorArray: Contador[] = [];



  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
    public snackBar: MatSnackBar,
    private carrito : CarritoGuardService
  ) { }

  ngOnInit(): void {
    this.getMenu()
    this.carrito.isIdmesa().subscribe(status => !status ? this.getMenu() : true)
  }

  getMenu(){
    this.menuService.getMenu()
    .subscribe(data=>{
      this.menuArray = data.data;
    },
    error =>console.log(error));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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

export class PizzaPartyComponent {}
