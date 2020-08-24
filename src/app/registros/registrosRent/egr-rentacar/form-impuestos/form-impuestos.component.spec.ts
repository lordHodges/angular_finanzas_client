import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImpuestosComponent } from './form-impuestos.component';

describe('FormImpuestosComponent', () => {
  let component: FormImpuestosComponent;
  let fixture: ComponentFixture<FormImpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormImpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
