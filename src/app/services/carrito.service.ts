import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Send, Sendid, Cliente } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http:HttpClient) {

  }
  agregarCarrito(menu: Send):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/agregarCarrito`, menu);
  }

  eliminarCarrito(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/eliminarCarrito`, menu);
  }

  resultadosCarrito(menu:Object):Observable<any>{
    return this.http.get(`${environment.BASE_API}/menu/resultadosCarrito`, menu);
  }

  confirmarPedido(menu:Object):Observable<any>{
    return this.http.get(`${environment.BASE_API}/menu/resultadosCarrito`, menu);
  }

  eliminarMenu(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/eliminarMenu`, menu);
  }

  rechazarPedido(id_mesa: Sendid):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/rechazarPedido`,id_mesa);
  }

  aceptarPedido(id_mesa: Sendid):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/confirmarPedido`,id_mesa);
  }

  eviarmenu(menu:Object):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/crearMenu`, menu);
  }

  ingresarCliente(menu:Cliente):Observable<any>{
    return this.http.post(`${environment.BASE_API}/menu/ingresarCliente`, menu);
  }
}
