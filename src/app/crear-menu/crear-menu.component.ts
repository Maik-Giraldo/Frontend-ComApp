import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit {

  menuArray: Menu[] = [];

  reader = new FileReader();
  imgMostrar : any;
  form: FormGroup;

  constructor(private menuService: MenuService, private fb: FormBuilder) {

  }
    get id_platillo() { return this.form.get('id_platillo'); }
    get nombre_platillo() { return this.form.get('nombre_platillo')}
    get descripcion_platillo() { return this.form.get('descripcion_platillo')}
    get precio_unitario() { return this.form.get('precio_unitario')}
    get tipo_platillo() { return this.form.get('tipo_platillo')}

  ngOnInit(): void {

    this.form = this.fb.group({
      id_platillo: ['', [Validators.required]],
      nombre_platillo: ['', [Validators.required]],
      descripcion_platillo:['', [Validators.required]],
      precio_unitario : ['', [Validators.required]],
      tipo_platillo : ['', [Validators.required]],

  });

    
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
    if (this.form.valid && this.imgMostrar.length > 1){
      let infoMenu: Menu = {
        id_platillo: this.form.value.id_platillo,
        platillo: this.form.value.nombre_platillo,
        descripcion: this.form.value.descripcion_platillo,
        precio_unitario: this.form.value.precio_unitario,
        tipo: this.form.value.tipo_platillo,
        img:this.imgMostrar}
      this.menuService.crearMenu(infoMenu)
      .subscribe(data=>{
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            console.log(data)
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            icon: 'success',
            title: 'Platillo agregado correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al agregar el platillo',
        confirmButtonText: `Ok`
      })
    }
  }

  editar(){
    if (this.form.valid && this.imgMostrar.length > 1){
      let infoMenu: Menu = {
        id_platillo: this.form.value.id_platillo,
        platillo: this.form.value.nombre_platillo,
        descripcion: this.form.value.descripcion_platillo,
        precio_unitario: this.form.value.precio_unitario,
        tipo: this.form.value.tipo_platillo,
        img:this.imgMostrar}
      this.menuService.editarMenu(infoMenu)
      .subscribe(data=>{
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            icon: 'success',
            title: 'platillo editado correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al editar el platillo',
        confirmButtonText: `Ok`
      })
    }
  }

  eliminar(){
    if (this.form.valid && this.imgMostrar.length > 1){
      let infoMenu: Menu = {
        id_platillo: this.form.value.id_platillo,
        platillo: this.form.value.nombre_platillo,
        descripcion: this.form.value.descripcion_platillo,
        precio_unitario: this.form.value.precio_unitario,
        tipo: this.form.value.tipo_platillo,
        img:this.imgMostrar}
      this.menuService.eliminarMenu(infoMenu)
      .subscribe(data=>{
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            icon: 'success',
            title: 'Platillo eliminado satisfactoriamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al eliminar el platillo',
        confirmButtonText: `Ok`
      })
    }

  }

  log(file){ 
    try {
      if (
        file.target.files[0].type == 'image/jpeg' ||
        file.target.files[0].type == 'image/png' ||
        file.target.files[0].type == 'image/gif'
        ) {
          this.reader.readAsDataURL(file.target.files[0]);
          this.reader.onload = () => {
          this.imgMostrar = this.reader.result;
          // this.imgMostrar = this.reader.result;
        };
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Selecciona una imagen válida',
          }).then((result) => {
            this.imgMostrar = null;
          })
        }
    } catch(error){
      
    }
  }


}
