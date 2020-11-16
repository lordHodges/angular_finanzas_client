import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaAbogadosListComponent } from './firma-abogados-list.component';

describe('FirmaAbogadosListComponent', () => {
  let component: FirmaAbogadosListComponent;
  let fixture: ComponentFixture<FirmaAbogadosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaAbogadosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaAbogadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
