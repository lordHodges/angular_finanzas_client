import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosFormComponent } from './contratos-form.component';

describe('ContratosFormComponent', () => {
  let component: ContratosFormComponent;
  let fixture: ComponentFixture<ContratosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
