import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EgresoHostalService } from '@app/_services';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-respaldos',
  templateUrl: './respaldos.component.html',
  styleUrls: ['./respaldos.component.less'],
})
export class RespaldosComponent implements OnInit, OnChanges {
  @Output()
  listo = new EventEmitter<boolean>();
  @Output()
  respuesta = new EventEmitter<[]>();
  response;
  @Input()
  idEmpresa = null;

  changelog: string[] = [];

  fileName;

  public uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  public uris: any[] = [];
  //
  //

  constructor(
    private service: EgresoHostalService,
    private route: ActivatedRoute
  ) {
    let urlAPi = '';
    this.idEmpresa = this.route.snapshot.params['idEmpresa'];

    switch (this.idEmpresa) {
      case '1':
        urlAPi = `${environment.apiUrl}/egresoHostal/upload`;
        break;
      case '2':
        urlAPi = `${environment.apiUrl}/egresoFirma/upload`;
        break;
      default:
        break;
    }
    this.uploader = new FileUploader({
      url: urlAPi,
      itemAlias: 'photo',
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log('ImageUpload:uploaded:', item.alias, status, response);
      this.uris.push(response);
    };

    this.uploader.onCompleteAll = () => {
      this.response = this.uris;
      alert(
        'Archivos exitosamente subidos:' + this.response.length + ' registros'
      );
      this.listo.emit(false);
      this.respuesta.emit(this.response);
    };
  }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName in changes) {
      console.log('onChanges');
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
