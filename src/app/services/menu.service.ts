import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) {

  }
  getCarrito():Observable<any>{
    let id_mesa : number = parseInt(localStorage.getItem('id_mesa'));
    let config: any = {
      responseType: "json"
    }
    const header = new HttpHeaders().set('id_mesa', `id ${id_mesa}`);
    config["headers"] = header;

    return this.http.get(`${environment.BASE_API}/menu/carritocompras`, config);
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
  peticionEditar(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/peticionEditar`, menu);
  }
  peticionEliminar(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/peticionEliminar`, menu);
  }
  editarMenu(menu:Object):Observable<any>{
    return this.http.put(`${environment.BASE_API}/menu/editarMenu`, menu);
  }
  eliminarMenu(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/eliminarMenu`, menu);
  }
  getFaturas():Observable<any>{
    return this.http.get(`${environment.BASE_API}/menu/personalcocina`);
  }
}
