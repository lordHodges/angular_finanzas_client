import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostalListComponent } from './hostal-list.component';

describe('HostalListComponent', () => {
  let component: HostalListComponent;
  let fixture: ComponentFixture<HostalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
