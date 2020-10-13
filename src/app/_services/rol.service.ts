import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Rol } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private rolSubject: BehaviorSubject<Rol>;
  public rol: Observable<Rol>;

  constructor(private router: Router, private http: HttpClient) {
    this.rolSubject = new BehaviorSubject<Rol>(
      JSON.parse(localStorage.getItem('Rol'))
    );
    this.rol = this.rolSubject.asObservable();
  }
  public get rolValue(): Rol {
    return this.rolSubject.value;
  }
  create(rol: Rol) {
    return this.http.post(`${environment.apiUrl}/rol`, rol);
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/rol`);
  }
  getById(id: string) {
    return this.http.get<Rol>(`${environment.apiUrl}/rol/${id}`);
  }
  update(id, params) {
    return this.http.put(`${environment.apiUrl}/rol/${id}`, params);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/rol/${id}`);
  }
}
