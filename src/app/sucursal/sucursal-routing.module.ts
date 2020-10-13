import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SucursalListComponent },
      { path: 'add', component: SucursalFormComponent },
      { path: 'edit/:id', component: SucursalFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucursalRoutingModule {}
