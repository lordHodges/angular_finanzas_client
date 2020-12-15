import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@app/_components';
import { ProyectoAgrofirma } from '@app/_models';
import { ProyectoAgrofirmaService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-layout-agrofirma',
  templateUrl: './layout-agrofirma.component.html',
  styleUrls: ['./layout-agrofirma.component.scss'],
})
export class LayoutAgrofirmaComponent implements OnInit {
  proyectos: ProyectoAgrofirma[] = [];
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
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
      });
  }
  registrarEgresos(idModal, idProyecto): void {
    this.modalService.open(idModal);
    this.router.navigate(['egresos/agrofirma/add', idProyecto]);
  }
  verEgresos(idModal, idProyecto): void {
    this.modalService.open(idModal);
    this.router.navigate(['egresos/agrofirma/list', idProyecto]);
  }
  closeModal(id): void {
    this.modalService.close(id);
    this.router.navigate(['egresos/agrofirma']);
  }
}
