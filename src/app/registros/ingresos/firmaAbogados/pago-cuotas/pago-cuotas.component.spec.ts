import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCuotasComponent } from './pago-cuotas.component';

describe('PagoCuotasComponent', () => {
  let component: PagoCuotasComponent;
  let fixture: ComponentFixture<PagoCuotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoCuotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
