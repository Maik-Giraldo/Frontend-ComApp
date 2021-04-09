import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  isAdm = new BehaviorSubject<boolean>(this.checkTipousuario())

  valida:number

  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  private checkTipousuario() : boolean{
    return !!localStorage.getItem('tipousuario')
  }


  login(token:string) : void {

    localStorage.setItem('token', token);
    this.isLogin.next(true);

  }

  loginAdmin(tipousuario: string) : void{
    localStorage.setItem('tipousuario', tipousuario);
    this.isAdm.next(true);
  }

  validate(): void {
    this.valida = Number(localStorage.getItem('tipousuario'));
    console.log(this.valida);
    if(this.valida == 1){
      this.isAdm.next(true)
    }else{
      this.isAdm.next(false)
    }
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('tipousuario');

    this.isLogin.next(false);
    this.isAdm.next(false);
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }

  isAdmin() : Observable<boolean> {
    return this.isAdm.asObservable();
   }

}
