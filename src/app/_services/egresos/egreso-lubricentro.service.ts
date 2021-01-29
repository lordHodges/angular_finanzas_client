import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EgresosLubricentro } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class EgresoLubricentroService {
  private egresosLubricentroSubject: BehaviorSubject<EgresosLubricentro>;
  private EgresosLubricentro: Observable<EgresosLubricentro>;
  constructor(private http: HttpClient, private router: Router) {}
  public get EgresosLubricentroValue(): EgresosLubricentro {
    return this.egresosLubricentroSubject.value;
  }
  create(EgresosLubricentro: EgresosLubricentro) {
    return this.http.post(
      `${environment.apiUrl}/egresoLubricentro/conRespaldo`,
      EgresosLubricentro
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/egresoLubricentro`);
  }
  getFiles(fileName: string) {
    return this.http
      .get(`${environment.apiUrl}/egresoLubricentro/download/${fileName}`, {
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
  /* api/egresoLubricentro/getDetalle/8 */
  getDetalleEgreso(idEgreso): any {
    return this.http.get(
      `${environment.apiUrl}/egresoLubricentro/getDetalle/${idEgreso}`
    );
  }

  getById(id: string) {
    return this.http.get<EgresosLubricentro>(
      `${environment.apiUrl}/egresoLubricentro/getEgreso/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/egresoBancario/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/egresoBancario/${id}`);
  }
}
