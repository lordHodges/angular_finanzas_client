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
import { CausasListComponent } from './firmaAbogados/causas-list/causas-list.component';
import { CausasFormComponent } from './firmaAbogados/causas-form/causas-form.component';
import { PagoCausaComponent } from './firmaAbogados/pago-causa/pago-causa.component';
import { ContratosListComponent } from './firmaAbogados/contratos-list/contratos-list.component';
import { ContratosFormComponent } from './firmaAbogados/contratos-form/contratos-form.component';
import { PagoCuotasComponent } from './firmaAbogados/pago-cuotas/pago-cuotas.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { ClientesComponent } from '@app/_components/clientes/clientes.component';
import { ListaContratosComponent } from './firmaAbogados/lista-contratos/lista-contratos.component';

@NgModule({
  declarations: [
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
    CausasListComponent,
    CausasFormComponent,
    PagoCausaComponent,
    ContratosListComponent,
    ContratosFormComponent,
    PagoCuotasComponent,
    ListaContratosComponent,
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
