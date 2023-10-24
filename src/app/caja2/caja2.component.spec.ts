import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caja2Component } from './caja2.component';

describe('Caja2Component', () => {
  let component: Caja2Component;
  let fixture: ComponentFixture<Caja2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Caja2Component]
    });
    fixture = TestBed.createComponent(Caja2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
