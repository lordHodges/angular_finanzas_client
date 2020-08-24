import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCostosVentComponent } from './form-costos-vent.component';

describe('FormCostosVentComponent', () => {
  let component: FormCostosVentComponent;
  let fixture: ComponentFixture<FormCostosVentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCostosVentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCostosVentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
