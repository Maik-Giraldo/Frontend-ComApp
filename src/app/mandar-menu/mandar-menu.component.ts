import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu';

@Component({
  selector: 'app-mandar-menu',
  templateUrl: './mandar-menu.component.html',
  styleUrls: ['./mandar-menu.component.css']
})
export class MandarMenuComponent implements OnInit {
  menuArray: Menu[] = [];

  constructor(private menuService: MenuService) {

   }

  ngOnInit(): void {
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
        if(data.transaccion){
          this.menuService.getMenu()
          .subscribe(data=>{
            console.log(data)
            this.menuArray = data.data;
          },error => console.log(error));
        }
      })
    }
    else{
      console.log("caso editar")
    }
  }
}
