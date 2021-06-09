import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mandar-menu',
  templateUrl: './mandar-menu.component.html',
  styleUrls: ['./mandar-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MandarMenuComponent implements OnInit {
  menuArray: Menu[] = [];
  formAgregar: boolean = false;
  formEditar: boolean = false;
  formEliminar: boolean = false;
  formContacto: boolean = false;
  load: boolean = true;
  form: FormGroup;

  reader = new FileReader();

  imgMostrar : any;

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder
    ) {}

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
    if (this.form.valid && this.imgMostrar){
      let infoMenu: Menu = {
        id_platillo: this.form.value.id_platillo,
        platillo: this.form.value.nombre_platillo,
        descripcion: this.form.value.descripcion_platillo,
        precio_unitario: this.form.value.precio_unitario,
        tipo: this.form.value.tipo_platillo,
        img:this.imgMostrar}
        this.load = false;
      this.menuService.mandarMenu(infoMenu)
      .subscribe(data=>{
        this.load = true;
        if(data.transaccion == true){
          console.log("entre")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Peticion enviada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La peticion no fue enviada',
            footer: 'rectifique los datos del formulario',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }else if(!this.imgMostrar){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'La imagen es requerida',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  editar(){
    this.load = false;
    if (this.form.valid){
      this.menuService.peticionEditar(this.selectedMenu)
      .subscribe(data=>{
        this.load = true;
        if(data.transaccion == true){
          console.log("entre")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Peticion enviada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La peticion no fue enviada',
            footer: 'rectifique los datos del formulario',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }
  }

  eliminar(lista: []){
    this.load = false;
    this.menuService.peticionEliminar(lista)
      .subscribe(data=>{
        this.load = true;
        if(data.transaccion == true){
          console.log("entre")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Peticion enviada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La peticion no fue enviada',
            footer: 'rectifique los datos del formulario',
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
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

  log2(file){
    try {
      if (
        file.target.files[0].type == 'image/jpeg' ||
        file.target.files[0].type == 'image/png' ||
        file.target.files[0].type == 'image/gif'
        ) {
          this.reader.readAsDataURL(file.target.files[0]);
          this.reader.onload = () => {
          this.selectedMenu.img = this.reader.result;
          // this.imgMostrar = this.reader.result;
        };
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Selecciona una imagen válida',
          }).then((result) => {
            this.selectedMenu.img = null;
          })
        }
    } catch(error){

    }
  }

}
