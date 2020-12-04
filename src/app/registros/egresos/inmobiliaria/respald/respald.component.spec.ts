import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldComponent } from './respald.component';

describe('RespaldosComponent', () => {
  let component: RespaldComponent;
  let fixture: ComponentFixture<RespaldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespaldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespaldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
