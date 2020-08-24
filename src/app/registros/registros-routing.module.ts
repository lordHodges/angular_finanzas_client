import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RegistrosComponent } from './registros.component';
import { RentListComponent } from './registrosRent/rent-list/rent-list.component';
import { IngRentacarComponent } from './registrosRent/ing-rentacar/ing-rentacar.component';
import { EgrRentacarComponent } from './registrosRent/egr-rentacar/egr-rentacar.component';
import { FormCostosVentComponent } from './registrosRent/egr-rentacar/form-costos-vent/form-costos-vent.component';
import { FormGastosOperComponent } from './registrosRent/egr-rentacar/form-gastos-oper/form-gastos-oper.component';
import { FormImpuestosComponent } from './registrosRent/egr-rentacar/form-impuestos/form-impuestos.component';
import { FormProductosFinanComponent } from './registrosRent/egr-rentacar/form-productos-finan/form-productos-finan.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: RegistrosComponent },
      {
        path: 'rent',
        component: RentListComponent,
        children: [
          { path: 'ingresoRentacar', component: IngRentacarComponent },
          {
            path: 'egresoRentacar',
            component: EgrRentacarComponent,
            children: [
              { path: 'formCostos', component: FormCostosVentComponent },
              { path: 'formGastos', component: FormGastosOperComponent },
              { path: 'formImpuestos', component: FormImpuestosComponent },
              {
                path: 'formProductFin',
                component: FormProductosFinanComponent,
              },
            ],
          },
        ],
      },

      /*{ path: 'hostal', component:  },
      { path: 'firmaabogados', component:  },
      { path: 'inmobiliaria', component:  },
      { path: 'agro', component:  },
      { path: 'lubricentro', component:  }, */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrosRoutingModule {}
