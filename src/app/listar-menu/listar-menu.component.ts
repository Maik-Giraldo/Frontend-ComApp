import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';

@Component({
  selector: 'app-listar-menu',
  templateUrl: './listar-menu.component.html',
  styleUrls: ['./listar-menu.component.css']
})
export class ListarMenuComponent implements OnInit {

  menuArray: Menu[] = [];

  constructor(
    private menuService: MenuService,
    private route: Router,
  ) { }

  ngOnInit(): void {

    this.menuService.getMenu()
    .subscribe(data=>{
      console.log(data)
      this.menuArray = data.data;
    },
    error =>console.log(error));
  }

}
