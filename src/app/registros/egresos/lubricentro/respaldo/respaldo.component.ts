import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { EgresoLubricentroService } from '@app/_services';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';

const UploadURL = `${environment.apiUrl}/egresoLubricentro/upload`;

@Component({
  selector: 'app-respaldo',
  templateUrl: './respaldo.component.html',
  styleUrls: ['./respaldo.component.scss'],
})
export class RespaldoComponent {
  @Output()
  listo = new EventEmitter<boolean>();
  @Output()
  respuesta = new EventEmitter<[]>();
  response;

  fileName;
  public uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  public uris: any[] = [];

  constructor(private service: EgresoLubricentroService) {
    this.uploader = new FileUploader({
      url: UploadURL,
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
  decargar(r) {
    let h = this.service.getFiles(r);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
