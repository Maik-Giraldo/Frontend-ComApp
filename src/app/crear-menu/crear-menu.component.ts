import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
  id: string;
  platillo: number;
  descripcion: number;
  precio: string;
  tipo: string;
  imagen: any;
  edit: any;
}

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit {

  displayedColumns: string[] = ['id', 'platillo', 'descripcion', 'precio', 'tipo', 'imagen', 'edit'];
  clickedRows = new Set<PeriodicElement>();

  menuArray: Menu[] = [];
  load: boolean = true;
  reader = new FileReader();
  imgMostrar : any;
  form: FormGroup;

  caso : number = 1;

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
      this.menuArray = data.data;
    },
    error =>console.log(error));
  }



  selectedMenu: Menu = new Menu();

  seleccionar(menu:Menu){
    this.caso = 2;
    this.selectedMenu = menu;
    this.imgMostrar = null;

  }

  nuevo(){
    this.selectedMenu = new Menu();
    this.imgMostrar = null;
    this.caso = 1;
  }

  guardar(){
    this.load = false;
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
        this.load = true;
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Platillo agregado correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }

        else{
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Error al agregar el platillo',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })

    }
  }

  editar(){
    this.load = false;
    if (this.form.valid && this.selectedMenu.img.length > 1){
      let infoMenu: Menu = {
        id_platillo: this.form.value.id_platillo,
        platillo: this.form.value.nombre_platillo,
        descripcion: this.form.value.descripcion_platillo,
        precio_unitario: this.form.value.precio_unitario,
        tipo: this.form.value.tipo_platillo,
        img:this.selectedMenu.img}
      this.menuService.editarMenu(infoMenu)
      .subscribe(data=>{
        this.load = true;
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Platillo editado correctamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
        else{
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Error al editar el platillo',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
      })
    }
  }

  eliminar(){
    this.load = false;
    if (this.form.valid){
      let infoMenu: Menu = {
        id_platillo: this.form.value.id_platillo,
        platillo: this.form.value.nombre_platillo,
        descripcion: this.form.value.descripcion_platillo,
        precio_unitario: this.form.value.precio_unitario,
        tipo: this.form.value.tipo_platillo,
        img:this.imgMostrar}
      this.menuService.eliminarMenu(infoMenu)
      .subscribe(data=>{
        this.selectedMenu = new Menu();
        this.imgMostrar = null;
        this.load = true;
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            this.menuArray = data.data;
          },error => console.log(error));
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Platillo eliminado satisfactoriamente',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
        else{
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Error al eliminar el platillo',
            showConfirmButton: true,
            confirmButtonText: `Ok`
          })
        }
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
            if(this.caso == 1){
              this.imgMostrar = this.reader.result;
              this.selectedMenu.img = null;
            }
            if(this.caso == 2){
              this.selectedMenu.img = this.reader.result;
              this.imgMostrar = null;
            }

          // this.imgMostrar = this.reader.result;
        };
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Selecciona una imagen válida',
          }).then((result) => {
            this.imgMostrar = null;
            this.selectedMenu.img = null;
          })
        }
    } catch(error){

    }
  }
}
