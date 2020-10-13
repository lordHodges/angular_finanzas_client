import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmobiliariaListComponent } from './inmobiliaria-list.component';

describe('InmobiliariaListComponent', () => {
  let component: InmobiliariaListComponent;
  let fixture: ComponentFixture<InmobiliariaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmobiliariaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmobiliariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
