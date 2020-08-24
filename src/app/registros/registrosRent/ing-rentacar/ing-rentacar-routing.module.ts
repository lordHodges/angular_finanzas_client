import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@app/registros/layout.component';
import { RentListComponent } from '../rent-list/rent-list.component';
import { IngRentacarComponent } from './ing-rentacar.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: RentListComponent },
      { path: 'add', component: IngRentacarComponent },
      { path: 'edit/:id', component: IngRentacarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngRentacarRoutingModule {}
