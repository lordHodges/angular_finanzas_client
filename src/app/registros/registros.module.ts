import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegistrosRoutingModule } from './registros-routing.module';

import { RegistrosComponent } from './registros.component';
import { LayoutComponent } from './layout.component';

import { RegistrosRentacarModule } from './registrosRent/registrosRentacar.module';

@NgModule({
  declarations: [RegistrosComponent, LayoutComponent],
  imports: [
    RegistrosRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RegistrosRentacarModule,
  ],
})
export class RegistrosModule {}
