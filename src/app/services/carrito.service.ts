import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Send } from '../models/menu';

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
}
