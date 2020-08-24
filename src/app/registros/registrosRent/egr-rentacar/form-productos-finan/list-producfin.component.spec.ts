import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProducfinComponent } from './list-producfin.component';

describe('ListProducfinComponent', () => {
  let component: ListProducfinComponent;
  let fixture: ComponentFixture<ListProducfinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProducfinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProducfinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
