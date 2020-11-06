import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Causa } from '@app/_models';
import { CausasService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pago-causa',
  templateUrl: './pago-causa.component.html',
  styleUrls: ['./pago-causa.component.less'],
})
export class PagoCausaComponent implements OnChanges, OnInit {
  @Input()
  row: string;
  idCausa;
  changelog: string[] = [];
  causa = null;

  //definiendo tabla
  private gridApi: any;
  private gridColumnApi: any;
  rowData2: any;
  columnDefs2 = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: 'Fecha de Pago',
      field: 'fechaPago',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Monto',
      field: 'montoCuota',
      sortable: true,
    },
    {
      headerName: 'Estado',
      field: 'estado',
      sortable: true,
      filter: true,
    },
  ];
  onGridReady2(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }

  constructor(private causaService: CausasService) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName in changes) {
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      if (!change.firstChange) {
        this.idCausa = to;
        this.causaService
          .getCausaConCuota(this.idCausa)
          .pipe()
          .subscribe((x) => {
            this.causa = x;
            this.rowData2 = x.CuotasCausas;
            console.log(this.rowData2);
          });
      }
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  mostrarCausa() {
    console.log(this.row);
  }
  obtenerCausa(id: string) {
    let causa;
  }
}
