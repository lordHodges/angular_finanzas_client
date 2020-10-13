import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrofirmaFormComponent } from './agrofirma-form.component';

describe('AgrofirmaFormComponent', () => {
  let component: AgrofirmaFormComponent;
  let fixture: ComponentFixture<AgrofirmaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrofirmaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrofirmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
