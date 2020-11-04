import { Component, Input, OnInit } from '@angular/core';
import { Causa } from '@app/_models';
import { CausasService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pago-causa',
  templateUrl: './pago-causa.component.html',
  styleUrls: ['./pago-causa.component.less'],
})
export class PagoCausaComponent {
  @Input()
  row: string;
  @Input()
  causa: Causa;

  constructor(private causaService: CausasService) {}

  mostrarCausa() {
    console.log(this.causa);
    console.log(this.row);
  }
}
