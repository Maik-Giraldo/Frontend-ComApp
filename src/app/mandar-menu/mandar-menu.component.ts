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

  form: FormGroup;

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
    if (this.selectedMenu._identificacion == null){
      this.menuService.mandarMenu(this.selectedMenu)
      .subscribe(data=>{

      })
    }
  }

  editar(){
    if (this.selectedMenu._identificacion == null){
      this.menuService.peticionEditar(this.selectedMenu)
      .subscribe(data=>{

      })
    }
  }

  eliminar(lista: []){
    this.menuService.peticionEliminar(lista)
      .subscribe(data=>{
        if(data.transaccion){

        }
      })
  }
}
