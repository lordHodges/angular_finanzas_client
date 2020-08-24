import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImpuestosComponent } from './list-impuestos.component';

describe('ListImpuestosComponent', () => {
  let component: ListImpuestosComponent;
  let fixture: ComponentFixture<ListImpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
