import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotasListComponent } from './cuotas-list.component';

describe('CuotasListComponent', () => {
  let component: CuotasListComponent;
  let fixture: ComponentFixture<CuotasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuotasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
