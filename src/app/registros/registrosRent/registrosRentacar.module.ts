import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentListComponent } from './rent-list/rent-list.component';
import { IngRentacarComponent } from './ing-rentacar/ing-rentacar.component';
import { EgrRentacarComponent } from './egr-rentacar/egr-rentacar.component';
import { FormProductosFinanComponent } from './egr-rentacar/form-productos-finan/form-productos-finan.component';
import { FormCostosVentComponent } from './egr-rentacar/form-costos-vent/form-costos-vent.component';
import { FormGastosOperComponent } from './egr-rentacar/form-gastos-oper/form-gastos-oper.component';
import { FormImpuestosComponent } from './egr-rentacar/form-impuestos/form-impuestos.component';
import { IngRentacarRoutingModule } from './ing-rentacar/ing-rentacar-routing.module';
import { LisCostosComponent } from './egr-rentacar/form-costos-vent/lis-costos.component';
import { ListGastosComponent } from './egr-rentacar/form-gastos-oper/list-gastos.component';
import { ListImpuestosComponent } from './egr-rentacar/form-impuestos/list-impuestos.component';
import { ListProducfinComponent } from './egr-rentacar/form-productos-finan/list-producfin.component';

@NgModule({
  declarations: [
    RentListComponent,
    IngRentacarComponent,
    EgrRentacarComponent,
    FormProductosFinanComponent,
    FormCostosVentComponent,
    FormGastosOperComponent,
    FormImpuestosComponent,
    LisCostosComponent,
    ListGastosComponent,
    ListImpuestosComponent,
    ListProducfinComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, IngRentacarRoutingModule],
})
export class RegistrosRentacarModule {}
