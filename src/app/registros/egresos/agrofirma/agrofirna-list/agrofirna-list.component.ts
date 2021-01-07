import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/_components';
import { EgresoAgrofirmaService, ExcelService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-agrofirna-list',
  templateUrl: './agrofirna-list.component.html',
  styleUrls: ['./agrofirna-list.component.scss'],
})
export class AgrofirnaListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  idProyecto = null;
  egresos = null;
  respaldos = null;

  // set table
  private gridApi: any;
  private gridApi2: any;
  private gridColumnApi: any;
  selectedRows: any[];
  rowFind;
  rowData: any;
  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { field: 'fecha', sortable: true, filter: true },
    { field: 'monto', sortable: true },
    {
      headerName: 'Proyecto',
      field: 'ProyectoAgrofirma.nombre',
      sortable: true,
      filter: true,
    },

    { field: 'tipoEgreso', sortable: true, filter: true },
    { field: 'descripcion', sortable: true, filter: true },

    {
      headerName: 'Usuario',
      field: 'Usuario.nombreUsuario',
      sortable: true,
      filter: true,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private egresoService: EgresoAgrofirmaService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params.idProyecto;
    this.egresoService
      .getAll(this.idProyecto)
      .pipe(first())
      .subscribe((egresos) => {
        this.egresos = egresos;
        console.log(this.egresos);
        this.rowData = this.egresos;
      });
  }
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  exportAsXLSX(): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.excelService.exportAsExcelFile(this.selectedRows, 'sample');
  }
  verRespaldos(id): void {
    let rowView;

    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));

    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id;
        this.rowFind = rowView;
        this.egresoService
          .getById(rowView)
          .pipe()
          .subscribe((respaldos) => {
            this.respaldos = respaldos.RespaldoEgresos;
            console.log(this.respaldos);

            this.modalService.open(id);
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
  descargar(url): void {
    this.egresoService.getFiles(url);
  }
  cerrarModdal(id): void {
    this.modalService.close(id);
  }
}
