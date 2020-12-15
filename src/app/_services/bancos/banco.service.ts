import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  constructor(private http: HttpClient) {}
  getAll(): any {
    return this.http.get<[]>(`${environment.apiUrl}/banco/obtenerBancos`);
  }
}
