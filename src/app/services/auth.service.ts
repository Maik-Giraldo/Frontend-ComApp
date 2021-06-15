import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  checkmanager = new BehaviorSubject<boolean>(this.checkrol())

  checkadmin= new BehaviorSubject<boolean>(this.checkrol())

  checkstaff= new BehaviorSubject<boolean>(this.checkrol())

  valida:string

  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  private checkrol() : boolean{
    return !!localStorage.getItem('rol')
  }

  constructor(private router: Router){}


  login(token:string) : void {

    localStorage.setItem('token', token);
    this.isLogin.next(true);

  }



  loginmanager(rol: string) : void{
    localStorage.setItem('rol', rol);
    this.checkmanager.next(true);
  }

  loginadmin(rol: string) : void{
    localStorage.setItem('rol', rol);
    this.checkadmin.next(true);
  }

  logintaff(rol: string) : void{
    localStorage.setItem('rol', rol);
    this.checkstaff.next(true);
  }

  validate(): void {
    this.valida = (localStorage.getItem('rol'));

    if(this.valida == '1'){
      this.checkmanager.next(true)
    }else{
      this.checkmanager.next(false)
    }

    if(this.valida == '2'){
      this.checkstaff.next(true)
    }else{
      this.checkstaff.next(false)
    }


    if(this.valida == '3'){
      this.checkadmin.next(true)
    }else{
      this.checkadmin.next(false)
    }


  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');

    this.isLogin.next(false);
    this.checkmanager.next(false);
    this.checkstaff.next(false);
    this.checkadmin.next(false);
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }



  ismanage() : Observable<boolean> {
    return this.checkmanager.asObservable();
   }


  isadmin() : Observable<boolean> {
    return this.checkadmin.asObservable();
   }

  isstaff() : Observable<boolean> {
    return this.checkstaff.asObservable();
   }

}
