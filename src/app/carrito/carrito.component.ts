import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';
import { Menu, Send, Sendid, Cliente } from '../models/menu';
import { ClientService } from '../services/client.service';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpiracionIdMesaService } from '../services/expiracion-id-mesa.service';
import { CarritoGuardService } from '../services/carrito-guard.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoArray: Carrito[] = [];
  public precio_total: number = 0;
  formCliente: boolean = false;
  load: boolean = true;
  validacion: boolean = true;
  form: FormGroup;
  reload : any;


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
    public auth: AuthService,
    private fb: FormBuilder,
    private carrito : CarritoGuardService,
    private id_mesa : ExpiracionIdMesaService
  ) { }

  get nombre() { return this.form.get('nombre'); }
  get documento() { return this.form.get('documento'); }
  get telefono() { return this.form.get('telefono'); }
  get correo() { return this.form.get('correo'); }

  ngOnInit(): void {

    this.menuService.getCarrito()
    .subscribe(data=>{

      this.carritoArray = data.data;

      if (this.carritoArray.length !=0){
        this.validacion = false;
        }

      this.carritoArray.forEach(carrito => this.precio_total += Number(carrito.precio_unitario))
    },
    error =>console.log(error));
    this.reload = setInterval(() => {
      try {
        this.menuService.getCarrito()
        .subscribe(data=>{
        this.carritoArray = data.data;
        if (this.carritoArray.length !=0){
        this.validacion = false;
        }
    },
    error =>console.log(error));
      }catch (e) {

      }

    },5000)

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
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
          window.location.reload();
        }
      })
  }

  rechazar(){
    const id_mesa = this.id_mesa.detectar();
    if(id_mesa == -1) return;

    this.load = false;
    this.validacion = true;
    this.formCliente = false

    let sendid  : Sendid = {

      id_mesa
    };
    this.carritoService.rechazarPedido(sendid)
    .subscribe(data=>{
      if(data.transaccion){
        var contador = 0
        this.carrito.changeCont(contador.toString())
      }
      this.load = true;
      Swal.fire({
        toast: true,
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


  aceptar(){
    const id_mesa = this.id_mesa.detectar();
    if(id_mesa == -1) return;

    this.load = false;
    this.validacion = true;

    let sendid  : Sendid = {

      id_mesa
    };

    this.carritoService.aceptarPedido(sendid)
    .subscribe(
      data=>{
      if(data.transaccion){
        var contador = 0
        this.carrito.changeCont(contador.toString())
      }
      this.load = true;
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'pedido aceptado correctamente',
        showConfirmButton: true,
        confirmButtonText: `Ok`
      }).then((result) => {
        //Read more about isConfirmed, isDenied below
        if (result.isConfirmed) {
          clearInterval(this.reload)
          localStorage.removeItem('id_mesa');

          this.route.navigate( ['/'])
        }
      })


    })

  }

  aceptarForm(){



    let cliente  : Cliente = {

      nombre : this.form.value.nombre,
      documento : this.form.value.documento,
      telefono : this.form.value.telefono,
      correo : this.form.value.correo

    };

    this.carritoService.ingresarCliente(cliente)
    .subscribe(
      data=>{
      if(data.transaccion){

        this.formCliente = false
        this.aceptar()
      }

    })

  }

  abrirForm(){
    this.formCliente = true
  }

  cerrarForm(){
    this.formCliente = false
  }
}





