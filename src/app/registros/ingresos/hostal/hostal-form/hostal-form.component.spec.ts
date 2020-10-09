import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostalFormComponent } from './hostal-form.component';

describe('HostalFormComponent', () => {
  let component: HostalFormComponent;
  let fixture: ComponentFixture<HostalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
