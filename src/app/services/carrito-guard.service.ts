import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoGuardService {

  private checkmesa() : boolean {
    return !!localStorage.getItem('id_mesa');
  }

  checkIdmesaValida = new BehaviorSubject<boolean>(this.checkmesa())

  constructor(private router: Router) { }

  changeIdmesa(id_mesa: string, status : boolean = true) : void{
    localStorage.setItem('id_mesa', id_mesa);
    this.router.navigate(['/'])
    status ? this.checkIdmesaValida.next(status) : this.checkIdmesaValida.next(status);
  }
  isIdmesa() : Observable<boolean> {
    return this.checkIdmesaValida.asObservable();
   }
}
