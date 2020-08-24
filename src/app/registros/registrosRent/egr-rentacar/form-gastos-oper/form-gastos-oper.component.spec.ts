import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGastosOperComponent } from './form-gastos-oper.component';

describe('FormGastosOperComponent', () => {
  let component: FormGastosOperComponent;
  let fixture: ComponentFixture<FormGastosOperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGastosOperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGastosOperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
