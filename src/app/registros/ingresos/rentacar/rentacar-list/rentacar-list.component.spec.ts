import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentacarListComponent } from './rentacar-list.component';

describe('RentacarListComponent', () => {
  let component: RentacarListComponent;
  let fixture: ComponentFixture<RentacarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentacarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentacarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
