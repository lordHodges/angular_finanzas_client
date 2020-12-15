import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EgresoAgrofirmaService {
  constructor(private http: HttpClient, private router: Router) {}

  create(egreso): any {
    return this.http.post(
      `${environment.apiUrl}/egresoAgrofirma/registrarEgreso`,
      egreso
    );
  }
  getAll(id): any {
    return this.http.get<[]>(
      `${environment.apiUrl}/egresoAgrofirma/obtenerEgresos/${id}`
    );
  }
  getById(id: string): any {
    return this.http.get(
      `${environment.apiUrl}/egresoAgrofirma/obtenerEgreso/${id}`
    );
  }
  getFiles(fileName: string): any {
    return this.http
      .get(`${environment.apiUrl}/egresoAgrofirma/download/${fileName}`, {
        responseType: 'blob',
      })
      .subscribe((res) => {
        window.open(window.URL.createObjectURL(res));
      });
  }
}
