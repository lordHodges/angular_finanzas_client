import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CostoLubricentro } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class CostoLubricentroService {
  private costoLubricentroSubject: BehaviorSubject<CostoLubricentro>;

  private costoLubricentro: Observable<CostoLubricentro>;

  constructor(private http: HttpClient, private router: Router) {}

  public get costoLubricentroValue(): CostoLubricentro {
    return this.costoLubricentroSubject.value;
  }

  create(costoLubricentro: CostoLubricentro) {
    return this.http.post(
      `${environment.apiUrl}/costoLubricentro/conRespaldo`,
      costoLubricentro
    );
  } 
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/costoLubricentro`);
  }
  getFiles(fileName: string) {
    let extencion = fileName.split('.');
    let extend = extencion[1];
    return this.http
      .get(`${environment.apiUrl}/costoLubricentro/download/${fileName}`, {
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
    return this.http.get<CostoLubricentro[]>(
      `${environment.apiUrl}/costoLubricentro/conUsuario`
    );
  }
  getById(id: string) {
    return this.http.get<CostoLubricentro>(
      `${environment.apiUrl}/costoLubricentro/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/costoLubricentro/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/costoLubricentro/${id}`);
  }
}