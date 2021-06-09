import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoGuardService } from '../services/carrito-guard.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoGuard implements CanActivate {
  constructor(
    private carrito: CarritoGuardService, 
    router: Router
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    return new Promise<boolean> ((resolve, reject) => {
      this.carrito.isIdmesa().subscribe(
        status => resolve(status) 
      )
    });
  } 
  
}
