import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ContratoAbogadoService {
  constructor(private http: HttpClient, private router: Router) {}
  obtenerContratos() {
    return this.http.get<[]>(
      `${environment.apiUrl}/contratoCienteAbogado/getContratos/`
    );
  }
  obtenerContratosCliente(idCliente) {
    return this.http.get<[]>(
      `${environment.apiUrl}/contratoCienteAbogado/contratosCliente/${idCliente}`
    );
  }
  calcularCuotas(data) {
    return this.http.post<[]>(
      `${environment.apiUrl}/cuotasContrato/calcularCuotas`,
      data
    );
  }
  crearSinoExiste(contrato) {
    return this.http.post<[]>(
      `${environment.apiUrl}/contratoCienteAbogado/`,
      contrato
    );
  }
  guardarCuotas(cuotas) {
    return this.http.post<[]>(`${environment.apiUrl}/cuotasContrato/`, cuotas);
  }
  obtenerContratoNumero(nContrato) {
    return this.http.get<[]>(
      `${environment.apiUrl}/contratoCienteAbogado/contratosNumero/${nContrato}`
    );
  }
  registrarPago(idCuota) {
    return this.http.post<[]>(
      `${environment.apiUrl}/cuotasContrato/registrarPago/`,
      idCuota
    );
  }
  repactarContrato(excuotas, newcuotas) {
    return this.http.post<[]>(
      `${environment.apiUrl}/cuotasContrato/repactarContrato/`,
      { excuotas: excuotas, newcuotas: newcuotas }
    );
  }
}
