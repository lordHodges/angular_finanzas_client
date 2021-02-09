import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CuentasBancariasService {
  constructor(private http: HttpClient, private router: Router) {}
  create(body): any {
    return this.http.post(
      `${environment.apiUrl}/banco/registrarCuentasBancarias/`,
      body
    );
  }
  getAll(): any {
    return this.http.get<[]>(`${environment.apiUrl}/banco/obtenerCuentas/`);
  }
  getAllByEntity(idEntity): any {
    return this.http.get<[]>(
      `${environment.apiUrl}/banco/obtenerCuentasByEntity/${idEntity}`
    );
  }
  crearCuentaSucursal(body): any {
    return this.http.post(
      `${environment.apiUrl}/banco/registrarCuentasSucursal/`,
      body
    );
  }
}
