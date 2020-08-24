import { Component, OnInit } from '@angular/core';
import { IngresosRentacarService } from '@app/_services/';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.less'],
})
export class RentListComponent implements OnInit {
  users = null;
  registros = null;

  constructor(private servicioIngresoRentacar: IngresosRentacarService) {
    this.servicioIngresoRentacar
      .mostrarTodos()
      .pipe(first())
      .subscribe((registros) => (this.registros = registros));
  }

  ngOnInit(): void {}

  eliminarRegistro(id: string) {
    const registro = this.registros.find((x) => x.id === id);
    registro.isDeleting = true;
    this.servicioIngresoRentacar
      .eliminar(id)
      .pipe(first())
      .subscribe(() => {
        this.registros = this.registros.filter((x) => x.id !== id);
      });
  }
}
