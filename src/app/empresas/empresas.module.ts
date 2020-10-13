import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { LayoutComponent } from './layout.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';

@NgModule({
  declarations: [LayoutComponent, EmpresaFormComponent, EmpresaListComponent],
  imports: [CommonModule, EmpresasRoutingModule, ReactiveFormsModule],
})
export class EmpresasModule {}
