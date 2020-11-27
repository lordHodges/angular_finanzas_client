import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { RentacarListComponent } from './rentacar/rentacar-list/rentacar-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
import { CostoLubricentroFormComponent } from './lubricentro/costo-lubricentro-form/costo-lubricentro-form.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'hostal',
        component: HostalListComponent,
        children: [
          { path: 'add/:idEmpresa', component: HostalFormComponent },
          {
            path: 'edit/',
            component: HostalFormComponent,
          },
        ],
      },
      { path: 'abogados', component: FirmaAbogadosFormComponent },
      { path: 'rentacar', component: RentacarListComponent },
      {
        path: 'lubricentro',
        component: LubricentroListComponent,
        children: [
          { path: 'add/:idEmpresa', component: LubricentroFormComponent },
          { path: 'lubricentro', component: CostoLubricentroFormComponent },
          { path: 'edit/', component: LubricentroFormComponent,},
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresosRoutingModule {}
