import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
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

    this.idEmpresa = this.route.snapshot.params['idEmpresa'];
    this.statics = !this.idEmpresa;
    if (this.idEmpresa == '1') {
      this.router.navigate([
        `/egresos/${this.idEmpresa}/hostal/${this.idEmpresa}`,
      ]);
    }
    if (this.idEmpresa == '2') {
      this.router.navigate([
        `/egregresos/${this.idEmpresa}/abogados/${this.idEmpresa}`,
      ]);
    }
    if (this.idEmpresa == '5') {
      this.router.navigate(['/empresas', { relativeTo: this.route }]);
    }
  }
}
