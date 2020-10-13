import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sucursal } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  private sucursalSubject: BehaviorSubject<Sucursal>;
  public sucursal: Observable<Sucursal>;

  constructor(private http: HttpClient, private router: Router) {
    this.sucursalSubject = new BehaviorSubject<Sucursal>(
      JSON.parse(localStorage.getItem('Sucursal'))
    );
    this.sucursal = this.sucursalSubject.asObservable();
  }
  public get sucursalValue(): Sucursal {
    return this.sucursalSubject.value;
  }
  create(sucursal: Sucursal) {
    return this.http.post(`${environment.apiUrl}/sucursal`, sucursal);
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/sucursal`);
  }
  getById(id: string) {
    return this.http.get<Sucursal>(`${environment.apiUrl}/sucursal/${id}`);
  }
  getByEmpresa(idEmpresa: string) {
    return this.http.get<[]>(
      `${environment.apiUrl}/sucursal/sucursalesEmpresa/${idEmpresa}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/sucursal/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/sucursal/${id}`);
  }
}
