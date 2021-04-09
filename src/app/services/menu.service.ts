import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) {

  }
  getMenu():Observable<any>{
    return this.http.get(`${environment.BASE_API}/menu/listarMenu`);
  }
  crearMenu(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/crearMenu`, menu);
  }
  mandarMenu(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/mandarMenu`, menu);
  }
}
