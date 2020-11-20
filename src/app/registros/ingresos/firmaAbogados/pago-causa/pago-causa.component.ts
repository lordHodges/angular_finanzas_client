import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Causa } from '@app/_models';
import { AlertService, CausasService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pago-causa',
  templateUrl: './pago-causa.component.html',
  styleUrls: ['./pago-causa.component.less'],
})
export class PagoCausaComponent implements OnChanges, OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Input()
  row: string;
  idCausa;
  changelog: string[] = [];
  causa = null;
  loading = false;
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
  onGridReady2(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }

  constructor(
    private causaService: CausasService,
    private alertService: AlertService
  ) {}
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
        this.loading = false;
      }
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  envv(e) {
    this.loading = e;
  }
  respuesta = null;
  resp(e) {
    this.respuesta = e;
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
    this.causaService
      .registrarPagoCuota(idCuota, cuota)
      .pipe()
      .subscribe((x) => {
        this.causaService
          .getCausaConCuota(this.idCausa)
          .pipe()
          .subscribe((x) => {
            this.causa = x;
            this.rowData2 = x.CuotasCausas;

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
