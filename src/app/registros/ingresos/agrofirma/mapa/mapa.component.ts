import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProyectoAgrofirma } from '@app/_models';
import { ProyectoAgrofirmaService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, OnChanges {
  @Input()
  idProyecto: string;
  proyecto = new ProyectoAgrofirma();
  url = '';
  secureUrl = null;
  changelog: string[] = [];
  constructor(
    private proyectoService: ProyectoAgrofirmaService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
      if (!change.firstChange) {
        this.proyectoService
          .getOne(to)
          .pipe()
          .subscribe((proyecto) => {
            this.proyecto = proyecto;
            this.url =
              'https://www.google.com/maps/embed?' +
              this.proyecto.geoLocalizacion;
            this.secureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.url
            );
          });
      }
    }
  }
  ngOnInit(): void {}
}
