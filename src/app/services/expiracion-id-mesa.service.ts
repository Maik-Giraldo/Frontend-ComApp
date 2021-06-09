import { Injectable } from '@angular/core';
import { CarritoGuardService } from '../services/carrito-guard.service';

@Injectable({
  providedIn: 'root'
})
export class ExpiracionIdMesaService {

  constructor(private carrito : CarritoGuardService){}

  detectar() : number{
    const mesa = localStorage.getItem('id_mesa')
    if(!mesa){
      this.carrito.changeIdmesa("", false)
      return -1
    }
    const objeto = JSON.parse(mesa);
    if (!objeto.id_mesa) {
      this.carrito.changeIdmesa("", false)
      return -1
    }
    if (!objeto.expiracion){
      this.carrito.changeIdmesa("", false)
      return -1
    }
    const expiracion = new Date(objeto.expiracion);
    const id_mesa : number = parseInt(objeto.id_mesa);
    const fecha_actual = new Date(); 
    if(fecha_actual > expiracion){
      this.carrito.changeIdmesa("", false)
      return -1
    }else{
      return id_mesa;
    }
  }
}
