import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrofirnaListComponent } from './agrofirna-list.component';

describe('AgrofirnaListComponent', () => {
  let component: AgrofirnaListComponent;
  let fixture: ComponentFixture<AgrofirnaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrofirnaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrofirnaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
