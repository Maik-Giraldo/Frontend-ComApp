import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  isAdm = new BehaviorSubject<boolean>(this.checkcorreo())

  valida:string

  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  private checkcorreo() : boolean{
    return !!localStorage.getItem('correo')
  }


  login(token:string) : void {

    localStorage.setItem('token', token);
    this.isLogin.next(true);

  }

  loginAdmin(correo: string) : void{
    localStorage.setItem('correo', correo);
    this.isAdm.next(true);
  }

  validate(): void {
    this.valida = (localStorage.getItem('correo'));
    console.log(this.valida);
    if(this.valida == 'leiton@gmail.com'){
      this.isAdm.next(true)
    }else{
      this.isAdm.next(false)
    }
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('correo');

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
