import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentListComponent } from './rent-list.component';

describe('RentListComponent', () => {
  let component: RentListComponent;
  let fixture: ComponentFixture<RentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
