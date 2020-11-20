import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { RentacarListComponent } from './rentacar/rentacar-list/rentacar-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
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
      { path: 'lubricentro', component: LubricentroFormComponent },
      { path: 'lubricentro', component: LubricentroListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresosRoutingModule {}
