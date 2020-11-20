import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaAbogadosFormComponent } from './firma-abogados-form.component';

describe('FirmaAbogadosFormComponent', () => {
  let component: FirmaAbogadosFormComponent;
  let fixture: ComponentFixture<FirmaAbogadosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaAbogadosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaAbogadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
