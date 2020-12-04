import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IngresosInmobiliaria } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class IngresoInmobiliariaService {
  private ingresosInmobiliariaSubject: BehaviorSubject<IngresosInmobiliaria>;

  private ingresosInmobiliaria: Observable<IngresosInmobiliaria>;

  constructor(private http: HttpClient, private router: Router) {}

  public get ingresosInmobiliariaValue(): IngresosInmobiliaria {
    return this.ingresosInmobiliariaSubject.value;
  }

  create(ingresosInmobiliaria: IngresosInmobiliaria) {
    return this.http.post(
      `${environment.apiUrl}/ingresoInmobiliaria/conRespaldo`,
      ingresosInmobiliaria
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/ingresoInmobiliaria`);
  }
  getFiles(fileName: string) {
    let extencion = fileName.split('.');
    let extend = extencion[1];
    return this.http
      .get(`${environment.apiUrl}/ingresoInmobiliaria/download/${fileName}`, {
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
  getAllWithUsuario() {
    return this.http.get<IngresosInmobiliaria[]>(
      `${environment.apiUrl}/ingresoInmobiliaria/conUsuario`
    );
  }
  getById(id: string) {
    return this.http.get<IngresosInmobiliaria>(
      `${environment.apiUrl}/ingresoInmobiliaria/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/ingresoInmobiliaria/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/ingresoInmobiliaria/${id}`);
  }
}