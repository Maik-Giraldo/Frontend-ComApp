import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { PersonalCocina, Pedido, Factura} from '../models/personal-cocina';
import { MenuService } from '../services/menu.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
  ) { }

  factura: Factura[] = []
  ngOnInit(): void {
    this.menuService.facturaCliente()
    .subscribe(data=>{
      this.factura = data.data;

    },
    error =>console.log(error));
    setInterval(() => {
      this.menuService.facturaCliente()
    .subscribe(data=>{
      this.factura = data.data;
    },
    error =>console.log(error));
    },60000)
  }

}
