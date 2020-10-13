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
  create(EgresosHostal: EgresosHostal) {
    return this.http.post(
      `${environment.apiUrl}/egresoBancario`,
      EgresosHostal
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/egresoBancario`);
  }

  getById(id: string) {
    return this.http.get<EgresosHostal>(
      `${environment.apiUrl}/egresoBancario/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/egresoBancario/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/egresoBancario/${id}`);
  }
}
