import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRoutingModule } from './egresos-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { EgresosFormComponent } from './egresos-form/egresos-form.component';
import { EgresosListComponent } from './egresos-list/egresos-list.component';


@NgModule({
  declarations: [LayoutComponent, EgresosFormComponent, EgresosListComponent],
  imports: [
    CommonModule,
    EgresosRoutingModule
  ]
})
export class EgresosModule { }
