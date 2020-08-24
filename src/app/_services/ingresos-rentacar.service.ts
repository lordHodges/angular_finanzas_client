import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { RegistroIngresoRent } from '@app/_models/';

@Injectable({
  providedIn: 'root',
})
export class IngresosRentacarService {
  private registroSubject: BehaviorSubject<RegistroIngresoRent>;
  public registroIngreso: Observable<RegistroIngresoRent>;

  constructor(private router: Router, private http: HttpClient) {
    this.registroIngreso = new BehaviorSubject<RegistroIngresoRent>(
      JSON.parse(localStorage.getItem('registroIngreso'))
    );
    /**
     * get registroIngresoValue
     */
  }
  public get registroIngresoValue(): RegistroIngresoRent {
    return this.registroSubject.value;
  }
  registrarIngreso(registroIngreso: RegistroIngresoRent) {
    return this.http.post(
      `${environment.apiUrl}/registrosRentacar/registrarIngreso`,
      registroIngreso
    );
  }
  mostrarPorId(id: string) {
    return this.http.get<RegistroIngresoRent>(
      `${environment.apiUrl}/registrosRentacar/${id}`
    );
  }
  editarRegistro(id, params) {
    return this.http.put(
      `${environment.apiUrl}/registrosRentacar/${id}`,
      params
    );
  }
  mostrarTodos() {
    return this.http.get<[]>(
      `${environment.apiUrl}/registrosRentacar/mostrarIngresos`
    );
  }
  eliminar(id: string) {
    return this.http.delete(`${environment.apiUrl}/registrosRentacar/${id}`);
  }
}
