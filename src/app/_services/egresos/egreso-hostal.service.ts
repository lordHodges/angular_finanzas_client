import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EgresosHostal } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class EgresoHostalService {
  private egresosHostalSubject: BehaviorSubject<EgresosHostal>;
  private egresosHostal: Observable<EgresosHostal>;
  constructor(private http: HttpClient, private router: Router) {}
  public get EgresosHostalValue(): EgresosHostal {
    return this.egresosHostalSubject.value;
  }
  create(EgresosHostal: EgresosHostal): any {
    return this.http.post(
      `${environment.apiUrl}/egresoHostal/conRespaldo`,
      EgresosHostal
    );
  }
  getAll(): any {
    return this.http.get<[]>(`${environment.apiUrl}/egresoHostal`);
  }
  getFiles(fileName: string): any {
    return this.http
      .get(`${environment.apiUrl}/egresoHostal/download/${fileName}`, {
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
    return this.http.get<EgresosHostal>(
      `${environment.apiUrl}/egresoHostal/${id}`
    );
  }
}
