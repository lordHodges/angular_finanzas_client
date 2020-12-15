import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrofirnaFormComponent } from './agrofirna-form.component';

describe('AgrofirnaFormComponent', () => {
  let component: AgrofirnaFormComponent;
  let fixture: ComponentFixture<AgrofirnaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrofirnaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrofirnaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
