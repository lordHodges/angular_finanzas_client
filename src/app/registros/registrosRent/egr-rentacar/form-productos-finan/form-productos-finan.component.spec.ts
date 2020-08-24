import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductosFinanComponent } from './form-productos-finan.component';

describe('FormProductosFinanComponent', () => {
  let component: FormProductosFinanComponent;
  let fixture: ComponentFixture<FormProductosFinanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductosFinanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductosFinanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
