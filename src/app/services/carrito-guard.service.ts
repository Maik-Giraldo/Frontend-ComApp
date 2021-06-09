import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoGuardService {

  public checkCont() : boolean {
    return !!localStorage.getItem('cont');
  }

  changeCont(contador: string): void {
    localStorage.setItem('cont', JSON.stringify(contador))
  }


  private checkmesa() : boolean {
    return !!localStorage.getItem('id_mesa');
  }

  checkIdmesaValida = new BehaviorSubject<boolean>(this.checkmesa())

  constructor(private router: Router) { }

  changeIdmesa(id_mesa: string, status : boolean = true) : void{
    if(status == false) this.checkIdmesaValida.next(false);
    const obtener_fecha = new Date()
    const fechaActual = {
      day : obtener_fecha.getDate(),
      month : obtener_fecha.getMonth(),
      year : obtener_fecha.getFullYear(),
      hour : obtener_fecha.getHours(),
      minute: obtener_fecha.getMinutes()
    }
    const expiracion = new Date(fechaActual.year, fechaActual.month, fechaActual.day, fechaActual.hour, fechaActual.minute + 30)

    const mesaTiempo = {
      id_mesa,
      expiracion
    }
    localStorage.setItem('id_mesa', JSON.stringify(mesaTiempo));
    this.router.navigate(['/'])
    status ? this.checkIdmesaValida.next(status) : this.checkIdmesaValida.next(status);;
  }
  isIdmesa() : Observable<boolean> {
    return this.checkIdmesaValida.asObservable();
   }
}
