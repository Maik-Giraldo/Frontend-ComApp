import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  postRequest(route: string, data?: any, token?: string) {
    if (token) {
      let config = {
        responseType: 'json',
      };
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      return this.http.post(route, data, { headers });
    } else {
      let config: any = {
        responseType: 'json',
      };
      return this.http.post(route, data, config);
    }
  }
}
