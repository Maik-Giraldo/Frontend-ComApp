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
  facturasArray: PersonalCocina[] = [];
  constructor(
    private menuService: MenuService,
    private carritoService: CarritoService,
    private route: Router,

  ) {}

  ngOnInit(): void {
    this.menuService.getFaturas()
    .subscribe(data=>{
      this.facturasArray = data.data;
    },
    error =>console.log(error));
  }

}
