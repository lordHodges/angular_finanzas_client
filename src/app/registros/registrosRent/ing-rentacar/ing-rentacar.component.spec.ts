import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngRentacarComponent } from './ing-rentacar.component';

describe('IngRentacarComponent', () => {
  let component: IngRentacarComponent;
  let fixture: ComponentFixture<IngRentacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngRentacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngRentacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
