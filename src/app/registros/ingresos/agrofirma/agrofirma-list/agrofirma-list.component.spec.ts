import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrofirmaListComponent } from './agrofirma-list.component';

describe('AgrofirmaListComponent', () => {
  let component: AgrofirmaListComponent;
  let fixture: ComponentFixture<AgrofirmaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrofirmaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrofirmaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
