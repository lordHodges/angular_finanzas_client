import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SucursalRoutingModule } from './sucursal-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';

@NgModule({
  declarations: [LayoutComponent, SucursalListComponent, SucursalFormComponent],
  imports: [CommonModule, SucursalRoutingModule, ReactiveFormsModule],
})
export class SucursalModule {}
