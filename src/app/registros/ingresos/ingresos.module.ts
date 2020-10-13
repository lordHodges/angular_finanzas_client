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
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
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
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
})
export class IngresosModule {}