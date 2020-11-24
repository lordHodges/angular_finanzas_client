import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LubricentroListComponent } from './lubricentro-list.component';

describe('LubricentroListComponent', () => {
  let component: LubricentroListComponent;
  let fixture: ComponentFixture<LubricentroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LubricentroListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LubricentroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
