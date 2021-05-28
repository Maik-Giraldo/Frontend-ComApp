import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { PersonalCocina } from '../models/personal-cocina';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-personal-cocina',
  templateUrl: './personal-cocina.component.html',
  styleUrls: ['./personal-cocina.component.css']
})
export class PersonalCocinaComponent implements OnInit {
  facturasArray: string[];
  names: string[];
  filterPost = '';
  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,
  ) {



  }

  ngOnInit(): void {
    this.menuService.getFaturas()
    .subscribe(data=>{
      this.facturasArray = data.data;

      console.log(this.facturasArray)

      data=Object.values(this.facturasArray)
      console.log(data.detalle_Pedido)

    },
    error =>console.log(error));
  }

}
