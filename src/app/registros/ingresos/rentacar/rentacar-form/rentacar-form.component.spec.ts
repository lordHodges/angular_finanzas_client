import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarFormComponent } from './rentacar-form.component';

describe('RentacarFormComponent', () => {
  let component: RentacarFormComponent;
  let fixture: ComponentFixture<RentacarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
