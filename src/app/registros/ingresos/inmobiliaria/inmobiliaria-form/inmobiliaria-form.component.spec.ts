import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmobiliariaFormComponent } from './inmobiliaria-form.component';

describe('InmobiliariaFormComponent', () => {
  let component: InmobiliariaFormComponent;
  let fixture: ComponentFixture<InmobiliariaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmobiliariaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmobiliariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
