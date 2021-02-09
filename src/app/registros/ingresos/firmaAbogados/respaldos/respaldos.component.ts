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
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-respaldos-firma',
  templateUrl: './respaldos.component.html',
  styleUrls: ['./respaldos.component.scss'],
})
export class RespaldosFirmaComponent implements OnInit, OnChanges {
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

  constructor(private route: ActivatedRoute) {
    let urlAPi = '';
    urlAPi = `${environment.apiUrl}/cuotasContrato/upload`;
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
      this.uploader.clearQueue();
      this.uris = [];
    };
  }
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    console.log(JSON.stringify(changes));

    for (const propName of Object.keys(changes)) {
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
