// Importacion de librerias necesarias
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CarritoService } from '../services/carrito.service';
import { Carrito, respuestaCarrito } from '../models/carrito';
import { Menu, Send, Sendid, Cliente } from '../models/menu';
import { ClientService } from '../services/client.service';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpiracionIdMesaService } from '../services/expiracion-id-mesa.service';
import { CarritoGuardService } from '../services/carrito-guard.service';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  displayedColumns: string[] = ['platillo', 'descripcion', 'precio', 'eliminar'];
  carritoArray: Carrito[] = [];
  cantidad : any;
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
    private id_mesa: ExpiracionIdMesaService,
    public snackBar: MatSnackBar,
  ) { }

  get nombre() { return this.form.get('nombre'); }
  get documento() { return this.form.get('documento'); }
  get telefono() { return this.form.get('telefono'); }
  get correo() { return this.form.get('correo'); }

  ngOnInit(): void {

    setInterval(() => {
      this.menuService.getFaturas()
    .subscribe(data=>{
      this.obtenerCarrito();
    },
    error =>console.log(error));
    },5000)

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
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
          const contador = data.resultados_count;
          this.carrito.changeCont(contador.toString())

        }
        this.obtenerCarrito();
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
        title: 'Has cancelado tu pedido correctamente',
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
        title: 'Pedido aceptado correctamemte, por favor, estar atento al correo para visualizar el estado de su pedido',
        footer: 'Si desea realizar otro pedido, escanee el código nuevamente',
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
    Swal.fire({
      toast: true,
      icon: 'warning',
      title: 'Por favor solo una persona aceptar el pedido',
      showConfirmButton: true,
      confirmButtonText: `Ok`
    })
    this.formCliente = true
  }

  cerrarForm(){
    this.formCliente = false
  }

  obtenerCarrito() : Carrito[]{
    try {
      this.menuService.getCarrito()
      .subscribe((data : respuestaCarrito)=>{
        this.precio_total = 0;
        this.carritoArray=[]
        if (data.data.length !=0){
          this.validacion = false;
          data.data.forEach((producto)=>{
            data.data.forEach((producto2)=>{
              if(producto == producto2){
                const producto3 : Carrito = {
                  _identificacion!: producto2._identificacion,
                  id_platillo!: producto2.id_platillo,
                  platillo!: producto2.platillo,
                  descripcion!: producto2.descripcion,
                  precio_unitario!: producto2.precio_unitario,
                  tipo!: producto2.tipo,
                  id_mesa!: producto2.id_mesa,
                  cantidad : 0,
                }
                if(this.carritoArray.findIndex(data=>{if(data.id_platillo == producto3.id_platillo) return data}) == -1 ){
                  this.carritoArray.push(producto3);
                };
                this.carritoArray[this.carritoArray.findIndex(data=>{if(data.id_platillo == producto3.id_platillo) return data })].cantidad++;
              }
            })
          })
          this.carritoArray.forEach(producto => {
            this.precio_total += producto.cantidad * producto.precio_unitario
          });
        }
      return data.data;
  },
  error =>console.log(error));
    }catch (e) {
      this.precio_total = 0;
      return []
    }
  }

}





