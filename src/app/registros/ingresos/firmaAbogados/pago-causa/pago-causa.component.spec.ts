import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCausaComponent } from './pago-causa.component';

describe('PagoCausaComponent', () => {
  let component: PagoCausaComponent;
  let fixture: ComponentFixture<PagoCausaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoCausaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCausaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
