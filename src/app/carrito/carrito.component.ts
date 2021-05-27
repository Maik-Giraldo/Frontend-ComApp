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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoArray: Carrito[] = [];
  public precio_total: number = 0;
  public mostrarVentana: boolean = false;
  form: FormGroup;

  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
    public auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.menuService.getCarrito()
    .subscribe(data=>{

      this.carritoArray = data.data;
      this.carritoArray.forEach(carrito => this.precio_total += Number(carrito.precio_unitario))
    },
    error =>console.log(error));

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
    });
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
      nombre : this.form.value.nombre,
      documento : this.form.value.documento,
      telefono : this.form.value.telefono,
      correo : this.form.value.correo
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


  verVentana(){
    this.mostrarVentana = true
  }

  envio(){
    let sendid : Sendid = {

      id_mesa : parseInt(localStorage.getItem('id_mesa')),
      nombre : this.form.value.nombre,
      documento : this.form.value.documento,
      telefono : this.form.value.telefono,
      correo : this.form.value.correo 
    };


    this.carritoService.aceptarPedido(sendid)
    .subscribe(
      data=>{
      if(data.transaccion){
        Swal.fire({
          icon: 'success',
          title: 'pedido aceptado correctamente',
          showConfirmButton: true,
          confirmButtonText: `Ok`
        }).then((result) => {
          //Read more about isConfirmed, isDenied below
          if (result.isConfirmed) {
            this.mostrarVentana = false;
            this.carritoArray = [];
            this.precio_total = 0
          }
        })
      }

    })
  }

  ocultarVentana(){
    this.mostrarVentana = false
  }
}





