import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { EgresosFormComponent } from './egresos-form/egresos-form.component';
import { EgresosListComponent } from './egresos-list/egresos-list.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { RespaldosComponent } from './hostal/respaldos/respaldos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { ExcelService } from '@app/_services';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from '../egresos/hostal/_modal';
@NgModule({
  declarations: [
    LayoutComponent,
    EgresosFormComponent,
    EgresosListComponent,
    HostalFormComponent,
    HostalListComponent,
    RespaldosComponent,
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
