import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
import { CarritoService } from '../services/carrito.service';
import { Menu, Send, Contador } from '../models/menu';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CarritoGuardService } from '../services/carrito-guard.service';
import { ExpiracionIdMesaService } from '../services/expiracion-id-mesa.service';





@Component({
  selector: 'app-listar-menu',
  templateUrl: './listar-menu.component.html',
  styleUrls: ['./listar-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ListarMenuComponent implements OnInit {


  cont: any = JSON.parse(localStorage.getItem('cont'));
  menuArray: Menu[] = [];
  contadorArray: Contador[] = [];

  load: boolean = true;

  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
    public snackBar: MatSnackBar,
    private carrito : CarritoGuardService,
    private id_mesa: ExpiracionIdMesaService,

  ) { }

  ngOnInit(): void {
    this.getMenu()

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
    const id_mesa = this.id_mesa.detectar();
    if(id_mesa == -1) return;
    var contador1;
    let send : Send = {
      menu : lista,
      id_mesa
    };

    this.carritoService.agregarCarrito(send)
      .subscribe(data=>{
        if(data.transaccion){

          var contador = data.resultados_count;
          this.carrito.changeCont(contador.toString());
          this.cont = contador

        }
      })
  }

  eliminar(lista: []){
    const id_mesa = this.id_mesa.detectar();
    if(id_mesa == -1) return;
    let send : Send = {
      menu : lista,
      id_mesa
    };
    this.carritoService.eliminarCarrito(send)
      .subscribe(data=>{
        if(data.transaccion){

          var contador = data.resultados_count;
          this.carrito.changeCont(contador.toString())
          this.cont = contador

        }
      })
  }
}

export class PizzaPartyComponent {}
