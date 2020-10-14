import { Component } from '@angular/core';
import { Dir } from '@app/_models';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { first } from 'rxjs/operators';

const UploadURL = 'http://localhost:3001/api/upload';

@Component({
  selector: 'app-respaldos',
  templateUrl: './respaldos.component.html',
  styleUrls: ['./respaldos.component.less'],
})
export class RespaldosComponent {
  public uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response;
  public dir: Dir;
  public uris: Dir[] = [];
  constructor() {
    this.uploader = new FileUploader({
      url: UploadURL,
      itemAlias: 'photo',
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.uploader.response
      .pipe()

      .subscribe((res) => {
        this.response = res;

        this.uris.push(this.response as Dir);
        console.log(this.uris);
      });

    /* this.uploader.response.subscribe((res) => {
      this.response = res;
      console.log(this.response);

      let length = this.uris.push(this.response);
      console.log(this.uris);
    }); */
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
