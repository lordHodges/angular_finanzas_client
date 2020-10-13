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
    EgresosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
})
export class EgresosModule {}
