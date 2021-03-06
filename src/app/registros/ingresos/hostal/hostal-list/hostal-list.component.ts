import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ExcelService, IngresoHostalService } from '@app/_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ModalService } from '@app/_components/_modal';

@Component({
  selector: 'app-hostal-list',
  templateUrl: './hostal-list.component.html',
  styleUrls: ['./hostal-list.component.scss'],
})
export class HostalListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi: any;
  private gridApi2: any;
  private gridColumnApi: any;
  rowFind;
  selectedRows: any[];
  ingresos = null;
  idEmpresa = null;
  id = null;
  mostrarList = true;
  total: number = 0;
  //mdtable
  rowData: any;
  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { field: 'fecha', sortable: true, filter: true },
    { field: 'monto', sortable: true, filter: true },
    { field: 'nDocumento', sortable: true, filter: true },

    { field: 'estadoPago', sortable: true, filter: true },
    { field: 'cliente', sortable: true, filter: true },

    { field: 'tipoIngreso', sortable: true, filter: true },

    {
      headerName: 'Sucursal',
      field: 'Sucursal.razonSocial',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Usuario',
      field: 'Usuario.nombreUsuario',
      sortable: true,
      filter: true,
    },
  ];

  //tabla modal
  rowData2: any;
  columnDefs2 = [
    {
      headerName: 'Archivo',
      field: 'url',
      sortable: true,
      filter: true,
      checkboxSelection: false,
    },
  ];
  //

  constructor(
    private ingresoService: IngresoHostalService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private excelService: ExcelService
  ) {}

  /////////////////////

  /////////////////////

  ngOnInit() {
    //////////////////////
    this.idEmpresa = this.route.snapshot.params.idEmpresa;
    this.id = this.route.snapshot.params.id;

    this.ingresoService
      .getAllWithUsuario()
      .pipe(first())
      .subscribe((ingresos) => (this.ingresos = ingresos));

    //TODO campos de configuracion de datatable jq.
    this.rowData = this.ingresoService.getAll();
  }
  onSelectionChanged() {
    var selectedRows = this.gridApi2.getSelectedRows();
    this.ingresoService.getFiles(selectedRows[0].url);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  onGridReady2(params) {
    this.gridApi2 = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  ///metodo de busqueda en tabla
  getSelectedRows() {
    this.total = 0;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.selectedRows.forEach((x) => {
      this.total = this.total + Number(x.monto);
    });
  }
  ////////////////////////////////////
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
      x.updatedAt = fechaF.toLocaleDateString('es-GB', formato);
    });
    console.log(this.selectedRows);
    this.excelService.exportAsExcelFile(this.selectedRows, 'sample');
  }
  mostrar(e) {
    if (e.target.checked) {
      this.mostrarList = true;
      this.ngOnInit();
    } else {
      this.mostrarList = false;
      this.ngOnInit();
    }
  }
  deleteIngreso(id: string) {
    const ingreso = this.ingresos.find((x) => x.id === id);
    if (confirm('Esta seguro que desea eliminar el registro: ')) {
      ingreso.isDeleting = true;
      this.ingresoService
        .delete(id)
        .pipe(first())
        .subscribe(() => {
          this.ingresos = this.ingresos.filter((x) => x.id !== id);
        });
      ingreso.isDeleting = false;
    }
  }
  async detalleIngreso() {
    let rowView;
    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    this.modalService.open('modal_detalle');

    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id;
        this.rowFind = rowView;
        this.ingresoService
          .getById(rowView)
          .pipe()
          .subscribe((x) => {
            this.rowData2 = x[0].RespaldoIngresos;
          });

        console.log('data2', this.rowData2);

        if (this.rowData2) {
        }
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
}
