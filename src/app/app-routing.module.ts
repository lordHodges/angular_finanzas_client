import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

//import { RegistrosModule } from './registros/registros.module';

/* const registrosModule = () =>
  import('./registros/registros.module').then((x) => x.RegistrosModule); */

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);
const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);
const empresasModule = () =>
  import('./empresas/empresas.module').then((x) => x.EmpresasModule);
const sucursalModule = () =>
  import('./sucursal/sucursal.module').then((x) => x.SucursalModule);
const ingresosModule = () =>
  import('./registros/ingresos/ingresos.module').then((x) => x.IngresosModule);
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },

  {
    path: 'account',
    loadChildren: accountModule,
  },
  {
    path: 'empresas',
    loadChildren: empresasModule,
  },
  {
    path: 'sucursales',
    loadChildren: sucursalModule,
  },
  {
    path: 'ingresos',
    loadChildren: ingresosModule,
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
