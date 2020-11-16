import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldosComponent } from './respaldos.component';

describe('RespaldosComponent', () => {
  let component: RespaldosComponent;
  let fixture: ComponentFixture<RespaldosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespaldosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
