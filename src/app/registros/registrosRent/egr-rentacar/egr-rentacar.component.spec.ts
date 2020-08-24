import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgrRentacarComponent } from './egr-rentacar.component';

describe('EgrRentacarComponent', () => {
  let component: EgrRentacarComponent;
  let fixture: ComponentFixture<EgrRentacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgrRentacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgrRentacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
