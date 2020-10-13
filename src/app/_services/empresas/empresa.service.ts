import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private empresaSubject: BehaviorSubject<Empresa>;
  public empresa: Observable<Empresa>;

  constructor(private http: HttpClient, private router: Router) {
    this.empresaSubject = new BehaviorSubject<Empresa>(
      JSON.parse(localStorage.getItem('Empresa'))
    );
    this.empresa = this.empresaSubject.asObservable();
  }

  public get empresaValue(): Empresa {
    return this.empresaSubject.value;
  }
  create(empresa: Empresa) {
    return this.http.post(`${environment.apiUrl}/empresa`, empresa);
  }
  getAll() {
    return this.http.get<Empresa[]>(`${environment.apiUrl}/empresa`);
  }
  getById(id: string) {
    return this.http.get<Empresa>(`${environment.apiUrl}/empresa/${id}`);
  }
  getByIdWithSucursales(id: string) {
    return this.http.get<Empresa>(
      `${environment.apiUrl}/empresa/empresaSucursales/${id}`
    );
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/empresa/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/empresa/${id}`);
  }
}
