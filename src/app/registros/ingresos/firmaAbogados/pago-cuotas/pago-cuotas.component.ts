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
        const c = this.idContrato;
        this.contratoService
          .obtenerContratoNumero(c)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x['CuotasContratos'];
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
  pagarCuota() {
    let idCuota;
    let cuota;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      idCuota = x.id;
      cuota = x;
    });
    let body = { idCuota: idCuota };
    this.contratoService
      .registrarPago(body)
      .pipe()
      .subscribe((x) => {
        this.contratoService
          .obtenerContratoNumero(this.idContrato)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x['CuotasContratos'];

            this.scrambleAndRefreshTopToBottom();
          });
        alert(x['msj']);
      });
  }
  scrambleAndRefreshTopToBottom() {
    var frame = 0;
    var i;
    var rowNode;
    var api = this.gridApi;
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

    function refreshRow(rowNode, api) {
      var millis = frame++ * 100;
      var rowNodes = [rowNode];
      var params = {
        rowNodes: rowNodes,
      };
      callRefreshAfterMillis(params, millis, api);
    }
    function callRefreshAfterMillis(params, millis, gridApi) {
      setTimeout(function () {
        gridApi.refreshCells(params);
      }, millis);
    }
  }
}
