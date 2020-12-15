import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { EgresosFormComponent } from './egresos-form/egresos-form.component';
import { EgresosListComponent } from './egresos-list/egresos-list.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
import { RespaldosComponent } from './respaldos/respaldos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ExcelService } from '@app/_services';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from '@app/_components/_modal';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';
import { FirmaAbogadosListComponent } from './firmaAbogados/firma-abogados-list/firma-abogados-list.component';
import { RespaldoComponent } from '../egresos/lubricentro/respaldo/respaldo.component';
import { RespaldComponent } from '../egresos/inmobiliaria/respald/respald.component';
import { RentacarListComponent } from './rentacar/rentacar-list/rentacar-list.component';
import { RentacarFormComponent } from './rentacar/rentacar-form/rentacar-form.component';
import { InmobiliariaFormComponent } from './inmobiliaria/inmobiliaria-form/inmobiliaria-form.component';
import { InmobiliariaListComponent } from './inmobiliaria/inmobiliaria-list/inmobiliaria-list.component';
import { AgrofirnaFormComponent } from './agrofirma/agrofirna-form/agrofirna-form.component';
import { AgrofirnaListComponent } from './agrofirma/agrofirna-list/agrofirna-list.component';
import { LayoutAgrofirmaComponent } from './agrofirma/layout-agrofirma/layout-agrofirma.component';
@NgModule({
  declarations: [
    LayoutComponent,
    EgresosFormComponent,
    EgresosListComponent,
    HostalFormComponent,
    HostalListComponent,
    LubricentroFormComponent,
    LubricentroListComponent,
    HostalListComponent,
    RespaldosComponent,
    RespaldoComponent,
    RespaldComponent,
    FirmaAbogadosFormComponent,
    FirmaAbogadosListComponent,
    RentacarListComponent,
    RentacarFormComponent,
    InmobiliariaFormComponent,
    InmobiliariaListComponent,
    AgrofirnaFormComponent,
    AgrofirnaListComponent,
    LayoutAgrofirmaComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    EgresosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AgGridModule.withComponents([]),
  ],
  providers: [ExcelService],
})
export class EgresosModule {}
