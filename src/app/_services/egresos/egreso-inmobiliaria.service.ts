import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EgresosInmobiliaria } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class EgresoInmobiliariaService {
  private egresosInmobiliariaSubject: BehaviorSubject<EgresosInmobiliaria>;
  private EgresosInmobiliaria: Observable<EgresosInmobiliaria>;
  constructor(private http: HttpClient, private router: Router) {}
  public get EgresosInmobiliariaValue(): EgresosInmobiliaria {
    return this.egresosInmobiliariaSubject.value;
  }
  create(EgresosInmobiliaria: EgresosInmobiliaria) {
    return this.http.post(
      `${environment.apiUrl}/egresoInmobiliaria/conRespaldo`,
      EgresosInmobiliaria
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/egresoInmobiliaria`);
  }
  getFiles(fileName: string) {
    return this.http
      .get(`${environment.apiUrl}/egresoInmobiliaria/download/${fileName}`, {
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

  getById(id: string):any {
    return this.http.get<EgresosInmobiliaria>(
      `${environment.apiUrl}/egresoInmobiliaria/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/egresoBancario/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/egresoBancario/${id}`);
  }
}
