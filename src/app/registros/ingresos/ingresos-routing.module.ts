import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';

import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { RentacarListComponent } from './rentacar/rentacar-list/rentacar-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
<<<<<<< HEAD
import { CostoLubricentroFormComponent } from './lubricentro/costo-lubricentro-form/costo-lubricentro-form.component';
=======
import { FirmaAbogadosListComponent } from './firmaAbogados/firma-abogados-list/firma-abogados-list.component';
import { ClientesComponent } from '@app/_components/clientes/clientes.component';
import { ListaContratosComponent } from './firmaAbogados/lista-contratos/lista-contratos.component';
>>>>>>> 0f9da0ff3462b81f21162def1b383e11d3358211
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
      {
        path: 'abogados',
        component: FirmaAbogadosFormComponent,
        children: [
          {
            path: 'listaContratos',
            component: ListaContratosComponent,
          },
          {
            path: 'listaClientes',
            component: ClientesComponent,
          },
        ],
      },
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
