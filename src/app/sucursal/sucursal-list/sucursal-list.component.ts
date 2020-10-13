import { Component, OnInit } from '@angular/core';
import { SucursalService } from '@app/_services/sucursales/sucursal.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-sucursal-list',
  templateUrl: './sucursal-list.component.html',
  styleUrls: ['./sucursal-list.component.less'],
})
export class SucursalListComponent implements OnInit {
  sucursales = null;
  constructor(private sucursalService: SucursalService) {}

  ngOnInit() {
    this.sucursalService
      .getAll()
      .pipe(first())
      .subscribe((sucursales) => (this.sucursales = sucursales));
    console.log(this.sucursales);
  }
  deleteSucursal(id: string) {
    const sucursal = this.sucursales.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      sucursal.isDeleting = true;
      this.sucursalService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.sucursales = this.sucursales.filter((x) => x.id !== id);
        });
      sucursal.isDeleting = false;
    }
  }
}
