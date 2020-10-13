import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IngresosAbogados } from '@app/_models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngresoAbogadosService {
  private ingresosAbogadosSubject: BehaviorSubject<IngresosAbogados>;
  private ingresosAbogados: Observable<IngresosAbogados>;
  constructor(private http: HttpClient, private router: Router) {
    this.ingresosAbogadosSubject = new BehaviorSubject<IngresosAbogados>(
      JSON.parse(localStorage.getItem('ingresosAbogados'))
    );
    this.ingresosAbogados = this.ingresosAbogadosSubject.asObservable();
  }
  public get ingresosAbogadosValue(): IngresosAbogados {
    return this.ingresosAbogadosSubject.value;
  }
  create(ingresosAbogados: IngresosAbogados) {
    return this.http.post(
      `${environment.apiUrl}/ingresosAbogados`,
      ingresosAbogados
    );
  }
  getAll() {
    return this.http.get<[]>(`${environment.apiUrl}/ingresosAbogados`);
  }
  getById(id: string) {
    return this.http.get<IngresosAbogados>(
      `${environment.apiUrl}/ingresosAbogados/${id}`
    );
  }
  update(id, params) {
    return this.http.put(
      `${environment.apiUrl}/ingresosAbogados/${id}`,
      params
    );
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/ingresosAbogados/${id}`);
  }
}
