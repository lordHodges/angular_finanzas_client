import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EgresoRentacarService {
  constructor(private http: HttpClient, private router: Router) {}
  create(egreso): any {
    return this.http.post(
      `${environment.apiUrl}/egresoRentacar/conRespaldo`,
      egreso
    );
  }
  getAll(): any {
    return this.http.get<[]>(`${environment.apiUrl}/egresoRentacar/getEgresos`);
  }
  getFiles(fileName: string): any {
    return this.http
      .get(`${environment.apiUrl}/egresoRentacar/download/${fileName}`, {
        responseType: 'blob',
      })
      .subscribe((res) => {
        window.open(window.URL.createObjectURL(res));
      });
  }
  public download(fileName: string): void {
    this.http
      .get('/files/${fileName}', { responseType: 'blob' })
      .subscribe((res) => {
        window.open(window.URL.createObjectURL(res));
      });
  }
  /* api/egresoRentacar/getDetalle/8 */
  getDetalleEgreso(idEgreso): any {
    return this.http.get(
      `${environment.apiUrl}/egresoRentacar/getDetalle/${idEgreso}`
    );
  }

  getById(id: string): any {
    return this.http.get(
      `${environment.apiUrl}/egresoRentacar/getEgreso/${id}`
    );
  }
}
