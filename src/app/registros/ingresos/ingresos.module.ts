import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IngresosRoutingModule } from './ingresos-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AgrofirmaFormComponent } from './agrofirma/agrofirma-form/agrofirma-form.component';
import { AgrofirmaListComponent } from './agrofirma/agrofirma-list/agrofirma-list.component';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';
import { FirmaAbogadosListComponent } from './firmaAbogados/firma-abogados-list/firma-abogados-list.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { InmobiliariaFormComponent } from './inmobiliaria/inmobiliaria-form/inmobiliaria-form.component';
import { InmobiliariaListComponent } from './inmobiliaria/inmobiliaria-list/inmobiliaria-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
import { RentacarFormComponent } from './rentacar/rentacar-form/rentacar-form.component';
import { RentacarListComponent } from './rentacar/rentacar-list/rentacar-list.component';
import { RespaldosComponent } from './hostal/respaldos/respaldos.component';
import { RespaldoComponent } from './lubricentro/respaldo/respaldo.component';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from '@app/_components/_modal';
import { AgGridModule } from 'ag-grid-angular';
import { ExcelService } from '@app/_services';
import { ContratosListComponent } from './firmaAbogados/contratos-list/contratos-list.component';
import { ContratosFormComponent } from './firmaAbogados/contratos-form/contratos-form.component';
import { PagoCuotasComponent } from './firmaAbogados/pago-cuotas/pago-cuotas.component';
import { ClientesComponent } from '@app/_components/clientes/clientes.component';
import { ListaContratosComponent } from './firmaAbogados/lista-contratos/lista-contratos.component';
import { RespaldComponent } from './inmobiliaria/respald/respald.component';
import { MapaComponent } from './agrofirma/mapa/mapa.component';
import { RegistrarIngresosComponent } from './agrofirma/registrar-ingresos/registrar-ingresos.component';
import { CuentasBancariasComponent } from '@app/_components';
import { RespaldosAgroComponent } from './agrofirma/respaldos/respaldos.component';
import { RespaldosFirmaComponent } from './firmaAbogados/respaldos/respaldos.component';
import { CuotasListComponent } from './firmaAbogados/cuotas-list/cuotas-list.component';

@NgModule({
  declarations: [
    RespaldosFirmaComponent,
    RespaldosAgroComponent,
    CuentasBancariasComponent,
    ClientesComponent,
    LayoutComponent,
    AgrofirmaFormComponent,
    AgrofirmaListComponent,
    FirmaAbogadosFormComponent,
    FirmaAbogadosListComponent,
    HostalListComponent,
    HostalFormComponent,
    InmobiliariaFormComponent,
    InmobiliariaListComponent,
    LubricentroFormComponent,
    LubricentroListComponent,
    RentacarFormComponent,
    RentacarListComponent,
    RespaldosComponent,
    RespaldoComponent,
    RespaldComponent,
    ContratosListComponent,
    ContratosFormComponent,
    PagoCuotasComponent,
    ListaContratosComponent,
    MapaComponent,
    RegistrarIngresosComponent,
    CuotasListComponent,
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ModalModule,
    AgGridModule,
  ],

  providers: [ExcelService],
})
export class IngresosModule {}
