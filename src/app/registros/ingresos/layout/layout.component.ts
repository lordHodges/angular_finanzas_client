import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  idEmpresa: string;
  statics: boolean;
  empresas = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => (this.empresas = empresas));
  }
}
