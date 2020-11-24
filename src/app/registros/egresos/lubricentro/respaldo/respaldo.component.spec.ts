import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldoComponent } from './respaldo.component';

describe('RespaldosComponent', () => {
  let component: RespaldoComponent;
  let fixture: ComponentFixture<RespaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
