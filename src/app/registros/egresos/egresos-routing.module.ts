import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { FirmaAbogadosListComponent } from './firmaAbogados/firma-abogados-list/firma-abogados-list.component';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
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
            path: 'edit/:id/:idEmpresa',
            component: HostalFormComponent,
          },
        ],
      },
      {
        path: 'firmaAbogado',
        component: FirmaAbogadosListComponent,
        children: [
          { path: 'add/:idEmpresa', component: FirmaAbogadosFormComponent },
          {
            path: 'edit/:id/:idEmpresa',
            component: FirmaAbogadosFormComponent,
          },
        ],
      },
      {
        path: 'lubricentro',
        component: LubricentroListComponent,
        children: [
          { path: 'add/:idEmpresa', component: LubricentroFormComponent },
          {
            path: 'edit/:id/:idEmpresa',
            component: LubricentroFormComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresosRoutingModule {}
