import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@app/_components';
import { ContratoAbogadoService, ExcelService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-cuotas-list',
  templateUrl: './cuotas-list.component.html',
  styleUrls: ['./cuotas-list.component.scss'],
})
export class CuotasListComponent implements OnInit {
  cuotas = null;
  respaldos = null;
  idCuota = null;
  cuota = { id: 0, url: '' };

  // configuracion Tabla
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData: any;
  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },

    {
      headerName: 'Fecha Compromiso',
      field: 'fechaPago',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Monto Cuota',
      field: 'montoCuota',
      sortable: true,
    },
    {
      headerName: 'Estado Pago',
      field: 'estado',
      sortable: true,
      filter: true,
    },

    {
      headerName: 'N° Contrato',
      field: 'idContrato',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Fecha Registro',
      field: 'createdAt',
      sortable: true,
    },

    {
      headerName: 'Fecha Actualizacion',
      field: 'updatedAt',
      sortable: true,
    },
  ];
  private gridApi: any;
  private gridColumnApi: any;
  selectedRows = null;
  constructor(
    private abogadoService: ContratoAbogadoService,
    private excelService: ExcelService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    console.log(this.cuotas);
    this.abogadoService.obtenerCuotas().subscribe((cuotas) => {
      this.cuotas = cuotas;
      this.rowData = this.cuotas;
    });
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  envv(e): void {
    let respaldo = {};
    let arrayRespaldos = [];
    let respuesta = e;
    respuesta.forEach((resp) => {
      respaldo = { idCuotaFirma: this.idCuota, url: resp };
      arrayRespaldos.push(respaldo);
    });
    this.abogadoService.agregarRespaldos(arrayRespaldos).subscribe(
      (data) => {
        arrayRespaldos = [];
        respuesta = [];
        this.abogadoService
          .obtenerRespaldos(this.idCuota)
          .subscribe((respaldos) => {
            this.respaldos = respaldos;
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  agregarRespaldos(modal: string): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        this.idCuota = x.id;
        this.abogadoService
          .obtenerRespaldos(this.idCuota)
          .subscribe((respaldos) => {
            this.modalService.open(modal);
            this.respaldos = respaldos; /*.find((cuota) => cuota.id === this.idCuota); */
            console.table(this.respaldos);
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
  exportAsXLSX(): void {
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));

    this.selectedRows.forEach((x) => {
      const fechaF = new Date(x.createdAt);
      const fechaG = new Date(x.updatedAt);
      const formato = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      x.createdAt = fechaF.toLocaleDateString('es-GB', formato);
      x.updatedAt = fechaG.toLocaleDateString('es-GB', formato);
    });
    this.excelService.exportAsExcelFile(this.selectedRows, 'Cuotas Abogados');
  }
  descargarArchivo(url): void {
    this.abogadoService.getFiles(url);
  }
  cerrarModal(id): void {
    this.modalService.close(id);
  }
}
