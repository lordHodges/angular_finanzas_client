import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@app/_components';
import { ProyectoAgrofirma } from '@app/_models';
import {
  AccountService,
  CuentasBancariasService,
  ExcelService,
  ProyectoAgrofirmaService,
} from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-ingresos',
  templateUrl: './registrar-ingresos.component.html',
  styleUrls: ['./registrar-ingresos.component.scss'],
})
export class RegistrarIngresosComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  @Input()
  idProyecto: string;
  proyecto = new ProyectoAgrofirma();
  idUsuario = null;
  submitted = false;
  usuario = null;
  form: FormGroup;
  cuentasProyecto = null;
  respaldoIngresos: any[] = [];
  respuesta;
  loading = true;
  // configuracion tabla
  private gridApi: any;
  private gridColumnApi: any;
  rowFind;
  selectedRows: any[];
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
    { headerName: 'Fecha', field: 'fecha', sortable: true, filter: true },
    { field: 'monto' },
    {
      headerName: 'Estado Pago',
      field: 'estadoPago',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Tipo Ingreso',
      field: 'tipoIngreso',
      sortable: true,
      filter: true,
    },
    { headerName: 'N° Documento', field: 'nDocumento', filter: true },
    { headerName: 'Descripcion', field: 'descripcionIngreso', filter: true },
    { headerName: 'Autorizacion', field: 'nAutorizacion' },
    {
      headerName: 'Usuario',
      field: 'Usuario.nombreUsuario',
      sortable: true,
      filter: true,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private proyectoService: ProyectoAgrofirmaService,
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private cuentasService: CuentasBancariasService,
    private modalService: ModalService
  ) {
    this.usuario = this.accountService.userValue;
    this.idUsuario = this.usuario.id;
  }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params.idProyecto;
    this.cuentasService
      .getAllByEntity(this.idProyecto)
      .pipe(first())
      .subscribe((cuentas) => {
        this.cuentasProyecto = cuentas;
      });
    this.proyectoService
      .obtenerIngresosByProyecto(this.idProyecto)
      .subscribe((ingresosProyecto) => {
        this.rowData = ingresosProyecto;
        console.log(ingresosProyecto);
      });
    this.proyectoService
      .getOne(this.idProyecto)
      .pipe(first())
      .subscribe((proyecto) => {
        this.proyecto = proyecto;
      });
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      monto: ['', Validators.required],
      nDocumento: ['', Validators.required],
      descripcionIngreso: ['', Validators.required],
      tipoIngreso: ['', Validators.required],
      estadoPago: ['', Validators.required],
      nAutorizacion: ['', Validators.required],
      idProyecto: this.idProyecto,
      idCuentaProyecto: ['', Validators.required],

      idUsuario: this.idUsuario,
      RespaldoIngresos: this.respaldoIngresos,
    });
  }
  envv(e): void {
    this.loading = e;
  }
  resp(e): void {
    this.respuesta = e;
    console.log(this.respuesta);
  }
  registrarIngreso(): void {
    for (let i = 0; i < this.respuesta.length; i++) {
      this.respaldoIngresos.push({ url: this.respuesta[i] });
    }
    this.form.value.RespaldoIngresos = this.respaldoIngresos;
    this.proyectoService
      .registrarIngreso(this.form.value)
      .pipe()
      .subscribe((data) => {
        this.ngOnInit();
      });
  }
  registrarRespaldos(): void {
    this.modalService.open('respaldos');
  }
  cerrarModdal(id): void {
    this.modalService.close(id);
  }

  get f(): any {
    return this.form.controls;
  }
  // ?funciones tabla
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
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
      x.updatedAt = fechaF.toLocaleDateString('es-GB', formato);
    });
    console.log(this.selectedRows);
    this.excelService.exportAsExcelFile(
      this.selectedRows,
      'Ingresos_Agrofirma'
    );
  }
  detalleRespaldos(id): void {
    let rowView;

    this.selectedRows = [];
    this.agGrid.api.getSelectedRows().forEach((x) => this.selectedRows.push(x));
    // !this.modalService.open('documentosEgresoHostal');
    if (this.selectedRows.length <= 1 && this.selectedRows.length > 0) {
      this.selectedRows.forEach((x) => {
        rowView = x.id;
        this.rowFind = rowView;
        this.proyectoService
          .obtenerIngreso(rowView)
          .pipe()
          .subscribe((x) => {
            this.respaldoIngresos = x.RespaldoIngresos;
            this.modalService.open(id);
          });
      });
    } else {
      alert(
        `Atencion: No es posible visualizar ${this.selectedRows.length} Registros`
      );
    }
  }
  descargar(url) {
    this.proyectoService.getFiles(url);
  }
}
