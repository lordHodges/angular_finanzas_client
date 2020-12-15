import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ProyectoAgrofirma } from '@app/_models';
@Injectable({
  providedIn: 'root',
})
export class ProyectoAgrofirmaService {
  constructor(private http: HttpClient, private router: Router) {}
  getAll(): any {
    return this.http.get<ProyectoAgrofirma[]>(
      `${environment.apiUrl}/proyectoAgrofirma/obtenerProyectos`
    );
  }
  create(entity): any {
    return this.http.post(
      `${environment.apiUrl}/proyectoAgrofirma/registrarProyecto`,
      entity
    );
  }
  getOne(id): any {
    return this.http.get<ProyectoAgrofirma>(
      `${environment.apiUrl}/proyectoAgrofirma/obtenerProyecto/${id}`
    );
  }
  update(id, body): any {
    return this.http.put(
      `${environment.apiUrl}/proyectoAgrofirma/actualizarProyecto/${id}`,
      body
    );
  }
  registrarIngreso(body): any {
    return this.http.post(
      `${environment.apiUrl}/ingresoAgrofirma/registrarIngreso/`,
      body
    );
  }
  obtenerIngresosByProyecto(id): any {
    return this.http.get(
      `${environment.apiUrl}/ingresoAgrofirma/obtenerIngresosByProyecto/${id}`
    );
  }
  obtenerIngreso(id): any {
    return this.http.get(
      `${environment.apiUrl}/ingresoAgrofirma/obtenerIngreso/${id}`
    );
  }
  getFiles(fileName: string): any {
    return this.http
      .get(`${environment.apiUrl}/ingresoAgrofirma/download/${fileName}`, {
        responseType: 'blob',
      })
      .subscribe((res) => {
        window.open(window.URL.createObjectURL(res));
      });
  }
  public download(fileName: string): void {
    this.http
      .get('/files/${fileName}', { responseType: 'blob' })
      .subscribe((res) => {
        window.open(window.URL.createObjectURL(res));
      });
  }
}
