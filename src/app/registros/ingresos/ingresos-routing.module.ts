import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
import { FirmaAbogadosFormComponent } from './firmaAbogados/firma-abogados-form/firma-abogados-form.component';

import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { RentacarListComponent } from './rentacar/rentacar-list/rentacar-list.component';
import { LubricentroFormComponent } from './lubricentro/lubricentro-form/lubricentro-form.component';
import { LubricentroListComponent } from './lubricentro/lubricentro-list/lubricentro-list.component';
import { FirmaAbogadosListComponent } from './firmaAbogados/firma-abogados-list/firma-abogados-list.component';
import { ClientesComponent } from '@app/_components/clientes/clientes.component';
import { ListaContratosComponent } from './firmaAbogados/lista-contratos/lista-contratos.component';
import { InmobiliariaFormComponent } from './inmobiliaria/inmobiliaria-form/inmobiliaria-form.component';
import { InmobiliariaListComponent } from './inmobiliaria/inmobiliaria-list/inmobiliaria-list.component';
import { AgrofirmaListComponent } from './agrofirma/agrofirma-list/agrofirma-list.component';
import { AgrofirmaFormComponent } from './agrofirma/agrofirma-form/agrofirma-form.component';
import { MapaComponent } from './agrofirma/mapa/mapa.component';
import { RegistrarIngresosComponent } from './agrofirma/registrar-ingresos/registrar-ingresos.component';
import { CuentasBancariasComponent } from '@app/_components/cuentas-bancarias/cuentas-bancarias.component';
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
            { path: 'edit/', component: LubricentroFormComponent,
          },
        ],
      },
      {
        path: 'inmobiliaria',
        component: InmobiliariaListComponent,
        children: [
          { path: 'add/:idEmpresa', component: InmobiliariaFormComponent },
          {
            path: 'edit/',
            component: InmobiliariaFormComponent,
          },
        ],
      },
      {
        path: 'agrofirma',
        component: AgrofirmaListComponent,
        children: [
          { path: 'add', component: AgrofirmaFormComponent },
          {
            path: 'edit/:idProyecto',
            component: AgrofirmaFormComponent,
          },
          {
            path: 'mapa/:id',
            component: MapaComponent,
          },
          {
            path: 'ingresos/:idProyecto',
            component: RegistrarIngresosComponent,
          },
          {
            path: 'addCuentasBancarias/:idEntidad',
            component: CuentasBancariasComponent,
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
export class IngresosRoutingModule {}
