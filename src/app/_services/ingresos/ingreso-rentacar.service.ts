import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class IngresoRentacarService {
  constructor(private http: HttpClient, private router: Router) {}
  getArriendos() {
    return this.http.get<[]>(`${environment.apiUrl}/ingresoRentacar/arriendos`);
  }
  getDetallePago(idArriendo) {
    return this.http.get<[]>(
      `${environment.apiUrl}/ingresoRentacar/detallePago/${idArriendo}`
    );
  }
}
