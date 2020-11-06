import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Causa } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class CausasService {
  constructor(private http: HttpClient, private router: Router) {}
  crearSinoExiste(codigo: string, causa: Causa) {
    return this.http.post<[]>(`${environment.apiUrl}/causa/${codigo}`, causa);
  }
  guardarCausa(causa: Causa) {
    return this.http.post<[]>(`${environment.apiUrl}/causa`, causa);
  }
  getCausasPorCliente(idCliente) {
    return this.http.get<Causa[]>(`${environment.apiUrl}/causa/${idCliente}`);
  }
  getCausa(idCausa) {
    return this.http.get<Causa>(
      `${environment.apiUrl}/causa/mostrarUna/${idCausa}`
    );
  }
  getCausaConCuota(idCausa) {
    return this.http.get<Causa>(
      `${environment.apiUrl}/causa/causaConCuota/${idCausa}`
    );
  }
}
