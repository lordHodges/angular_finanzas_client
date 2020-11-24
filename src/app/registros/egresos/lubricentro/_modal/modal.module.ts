import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [CommonModule, AgGridModule.withComponents([])],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}
