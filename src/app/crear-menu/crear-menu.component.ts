import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit {

  menuArray: Menu[] = [];

  constructor(private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.menuService.getMenu()
    .subscribe(data=>{
      console.log(data)
      this.menuArray = data.data;
    },
    error =>console.log(error));
  }

  selectedMenu: Menu = new Menu();
  seleccionar(menu:Menu){
    this.selectedMenu = menu;

  }

  nuevo(){
    this.selectedMenu = new Menu();
  }

  guardar(){
    if (this.selectedMenu._identificacion == null){
      this.menuService.crearMenu(this.selectedMenu)
      .subscribe(data=>{
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            console.log(data)
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al agregar el usuario',
        confirmButtonText: `Ok`
      })
    }
  }

  editar(){
    if (this.selectedMenu._identificacion == null){
      this.menuService.editarMenu(this.selectedMenu)
      .subscribe(data=>{
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            icon: 'success',
            title: 'Usuario editado correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al editar el usuario',
        confirmButtonText: `Ok`
      })
    }
  }

  eliminar(){
    if (this.selectedMenu._identificacion == null){
      this.menuService.eliminarMenu(this.selectedMenu)
      .subscribe(data=>{
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado satisfactoriamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al eliminar el usuario',
        confirmButtonText: `Ok`
      })
    }

  }


}
