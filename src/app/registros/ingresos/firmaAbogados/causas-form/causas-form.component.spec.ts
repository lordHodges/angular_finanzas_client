import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CausasFormComponent } from './causas-form.component';

describe('CausasFormComponent', () => {
  let component: CausasFormComponent;
  let fixture: ComponentFixture<CausasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CausasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
