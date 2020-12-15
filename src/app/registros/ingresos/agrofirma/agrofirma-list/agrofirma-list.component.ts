import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/_components';
import { ProyectoAgrofirma } from '@app/_models';
import { ProyectoAgrofirmaService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-agrofirma-list',
  templateUrl: './agrofirma-list.component.html',
  styleUrls: ['./agrofirma-list.component.scss'],
})
export class AgrofirmaListComponent implements OnInit {
  proyectos: ProyectoAgrofirma[];
  proyecto = new ProyectoAgrofirma();
  idProyecto = null;
  constructor(
    private modalService: ModalService,
    private ProyectoService: ProyectoAgrofirmaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ProyectoService.getAll()
      .pipe(first())
      .subscribe((proyectosReq) => {
        this.proyectos = proyectosReq;
        console.log(this.proyectos);
      });
  }
  registrarIngresos(idModal, idProyecto): void {
    this.modalService.open(idModal);
    this.router.navigate(['ingresos/agrofirma/ingresos', idProyecto]);
  }
  registrarProyecto(id): any {
    this.router.navigate(['ingresos/agrofirma/add']);
    this.modalService.open(id);
  }
  verMapa(id): void {
    this.idProyecto = id;
    this.modalService.open('mapaModal');
  }
  addCuentasBancarias(id, idProyecto): void {
    this.router.navigate([
      'ingresos/agrofirma/addCuentasBancarias',
      idProyecto,
    ]);
    this.modalService.open(id);
  }

  closeModal(id): void {
    this.modalService.close(id);
    this.router.navigate(['ingresos/agrofirma']);
  }
}
