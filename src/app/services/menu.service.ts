import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu, contacto} from '../models/menu';
import { PersonalCocina } from '../models/personal-cocina';
import { ExpiracionIdMesaService } from '../services/expiracion-id-mesa.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient, private id_mesa : ExpiracionIdMesaService) {

  }
  getCarrito():Observable<any>{
    const id_mesa = this.id_mesa.detectar();
    if(id_mesa == -1) return;
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
  peticionContacto(contacto:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/peticionContacto`, contacto);
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

  confirmarCocina(personalCocina:Object):Observable<any>{
    return this.http.put(`${environment.BASE_API}/menu/confirmarCocina`, personalCocina);
  }

  finalizarCocina(personalCocina:Object):Observable<any>{
    return this.http.put(`${environment.BASE_API}/menu/finalizarCocina`, personalCocina);
  }

  rechazarCocina(personalCocina:Object):Observable<any>{
    return this.http.put(`${environment.BASE_API}/menu/rechazarCocina`, personalCocina);
  }

  facturaCliente():Observable<any>{
    return this.http.get(`${environment.BASE_API}/menu/facturaCliente`);
  }
}
