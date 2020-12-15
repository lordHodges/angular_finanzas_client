import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegistroEgresoFirma } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class EgresoFirmaService {
  private egresosSubject: BehaviorSubject<RegistroEgresoFirma>;
  private egresos: Observable<RegistroEgresoFirma>;
  constructor(private http: HttpClient, private router: Router) {}
  public get EgresosHostalValue(): RegistroEgresoFirma {
    return this.egresosSubject.value;
  }
  create(egresos: RegistroEgresoFirma): any {
    return this.http.post(
      `${environment.apiUrl}/egresoFirma/conRespaldo/`,
      egresos
    );
  }
  getAll(): any {
    return this.http.get<[]>(`${environment.apiUrl}/egresoFirma`);
  }
  getFiles(fileName: string): any {
    return this.http
      .get(`${environment.apiUrl}/egresoFirma/download/${fileName}`, {
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
  getById(id: string): any {
    return this.http.get<RegistroEgresoFirma>(
      `${environment.apiUrl}/egresoFirma/${id}`
    );
  }
  update(id, params): any {
    return this.http.put(`${environment.apiUrl}/egresoFirma/${id}`, params);
  }
  delete(id: string): any {
    return this.http.delete(`${environment.apiUrl}/egresoFirma/${id}`);
  }
}
