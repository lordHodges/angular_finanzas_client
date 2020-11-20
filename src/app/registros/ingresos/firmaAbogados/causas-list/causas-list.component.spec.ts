import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CausasListComponent } from './causas-list.component';

describe('CausasListComponent', () => {
  let component: CausasListComponent;
  let fixture: ComponentFixture<CausasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CausasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CausasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
