import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ContratoAbogadoService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-pago-cuotas',
  templateUrl: './pago-cuotas.component.html',
  styleUrls: ['./pago-cuotas.component.less'],
})
export class PagoCuotasComponent implements OnInit, OnChanges {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Input()
  idContrato: number;
  loading = false;
  //
  //
  //definiendo tabla
  private gridApi: any;
  private gridColumnApi: any;
  rowData2: any;
  selectedRows = null;
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
  changelog: string[] = [];
  constructor(private contratoService: ContratoAbogadoService) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      if (!change.firstChange) {
        const c = this.idContrato;
        this.contratoService
          .obtenerContratoNumero(c)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x.CuotasContratos;
            console.log(this.rowData2);
          });
        this.loading = false;
      }
    }
  }

  ngOnInit(): void {}
  onGridReady2(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  pagarCuota(): void {
    let idCuota;
    let cuota;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      idCuota = x.id;
      cuota = x;
    });
    const body = { idCuota };
    this.contratoService
      .registrarPago(body)
      .pipe()
      .subscribe((x) => {
        this.contratoService
          .obtenerContratoNumero(this.idContrato)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x.CuotasContratos;

            this.scrambleAndRefreshTopToBottom();
          });
        alert(x.msj);
      });
  }
  scrambleAndRefreshTopToBottom(): void {
    let frame = 0;
    let i;
    let rowNode;
    const api = this.gridApi;
    for (i = 0; i < api.getPinnedTopRowCount(); i++) {
      rowNode = api.getPinnedTopRow(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < this.gridApi.getDisplayedRowCount(); i++) {
      rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      refreshRow(rowNode, api);
    }
    for (i = 0; i < this.gridApi.getPinnedBottomRowCount(); i++) {
      rowNode = this.gridApi.getPinnedBottomRow(i);
      refreshRow(rowNode, api);
    }

    function refreshRow(rowNode, api): void {
      const millis = frame++ * 100;
      const rowNodes = [rowNode];
      const params = {
        rowNodes,
      };
      callRefreshAfterMillis(params, millis, api);
    }
    function callRefreshAfterMillis(params, millis, gridApi): void {
      setTimeout(() => {
        gridApi.refreshCells(params);
      }, millis);
    }
  }
}
