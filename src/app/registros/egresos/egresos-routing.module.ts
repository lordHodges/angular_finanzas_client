import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HostalListComponent } from './hostal/hostal-list/hostal-list.component';
import { HostalFormComponent } from './hostal/hostal-form/hostal-form.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: ':idEmpresa',
    component: LayoutComponent,
    children: [
      {
        path: 'hostal/:idEmpresa',
        component: HostalListComponent,
        children: [
          { path: 'add/:idEmpresa', component: HostalFormComponent },
          {
            path: 'edit/:id/:idEmpresa',
            component: HostalFormComponent,
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
