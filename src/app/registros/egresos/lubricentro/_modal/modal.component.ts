import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { EgresoLubricentroService } from '@app/_services';
import { AgGridAngular } from 'ag-grid-angular';
import { ModalService } from './modal.service';

@Component({
  selector: 'jw-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() row: string;
  lista: any[] = [];

  private gridApi: any;
  private gridColumnApi: any;
  private element: any;
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData: any;
  columnDefs2 = [
    {
      headerName: 'Archivo',
      field: 'url',
      sortable: true,
      filter: true,
      checkboxSelection: false,
    },
  ];

  constructor(
    private service: EgresoLubricentroService,
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists

    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }
  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.service.getFiles(selectedRows[0].url);
  }
  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  async open(row) {
    this.service.getById(row).subscribe((x) => {
      this.rowData = x[0].RespaldoEgresos;
      console.log(this.rowData);
    });
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
