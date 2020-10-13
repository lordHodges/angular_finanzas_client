import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IngresosHostal } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class IngresoHostalService {
  private ingresosHostalSubject: BehaviorSubject<IngresosHostal>;
  private ingresosHostal: Observable<IngresosHostal>;
  constructor(private http: HttpClient, private router: Router) {}
  public get ingresosHostalValue(): IngresosHostal {
    return this.ingresosHostalSubject.value;
  }
  create(ingresosHostal: IngresosHostal) {
    return this.http.post(
      `${environment.apiUrl}/ingresoHostal`,
      ingresosHostal
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/ingresoHostal`);
  }
  getAllWithUsuario() {
    return this.http.get<IngresosHostal[]>(
      `${environment.apiUrl}/ingresoHostal/conUsuario`
    );
  }
  getById(id: string) {
    return this.http.get<IngresosHostal>(
      `${environment.apiUrl}/ingresoHostal/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/ingresoHostal/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/ingresoHostal/${id}`);
  }
}
