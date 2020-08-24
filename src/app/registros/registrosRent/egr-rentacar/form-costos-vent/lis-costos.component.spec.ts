import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LisCostosComponent } from './lis-costos.component';

describe('LisCostosComponent', () => {
  let component: LisCostosComponent;
  let fixture: ComponentFixture<LisCostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisCostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LisCostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
