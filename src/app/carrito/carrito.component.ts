import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../models/carrito';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoArray: Carrito[] = [];

  constructor(
    private menuService: MenuService,
    private route: Router,
  ) { }

  ngOnInit(): void {

    this.menuService.getCarrito()
    .subscribe(data=>{
      console.log(data)
      this.carritoArray = data.data;
    },
    error =>console.log(error));
  }
}
