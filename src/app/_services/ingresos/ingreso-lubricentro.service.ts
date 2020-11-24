import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IngresosLubricentro } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class IngresoLubricentroService {
  private ingresosLubricentroSubject: BehaviorSubject<IngresosLubricentro>;

  private ingresosLubricentro: Observable<IngresosLubricentro>;

  constructor(private http: HttpClient, private router: Router) {}

  public get ingresosLubricentroValue(): IngresosLubricentro {
    return this.ingresosLubricentroSubject.value;
  }

  create(ingresosLubricentro: IngresosLubricentro) {
    return this.http.post(
      `${environment.apiUrl}/ingresoLubricentro/conRespaldo`,
      ingresosLubricentro
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/ingresoLubricentro`);
  }
  getFiles(fileName: string) {
    let extencion = fileName.split('.');
    let extend = extencion[1];
    return this.http
      .get(`${environment.apiUrl}/ingresoLubricentro/download/${fileName}`, {
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
    return this.http.get<IngresosLubricentro[]>(
      `${environment.apiUrl}/ingresoLubricentro/conUsuario`
    );
  }
  getById(id: string) {
    return this.http.get<IngresosLubricentro>(
      `${environment.apiUrl}/ingresoLubricentro/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/ingresoLubricentro/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/ingresoLubricentro/${id}`);
  }
}