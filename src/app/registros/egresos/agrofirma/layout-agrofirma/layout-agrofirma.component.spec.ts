import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAgrofirmaComponent } from './layout-agrofirma.component';

describe('LayoutAgrofirmaComponent', () => {
  let component: LayoutAgrofirmaComponent;
  let fixture: ComponentFixture<LayoutAgrofirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAgrofirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAgrofirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
