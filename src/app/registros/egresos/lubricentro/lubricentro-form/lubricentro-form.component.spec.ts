import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LubricentroFormComponent } from './lubricentro-form.component';

describe('LubricentroFormComponent', () => {
  let component: LubricentroFormComponent;
  let fixture: ComponentFixture<LubricentroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LubricentroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LubricentroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
