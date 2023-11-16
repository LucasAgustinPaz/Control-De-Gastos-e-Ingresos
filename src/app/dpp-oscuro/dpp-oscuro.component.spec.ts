import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DppOscuroComponent } from './dpp-oscuro.component';

describe('DppOscuroComponent', () => {
  let component: DppOscuroComponent;
  let fixture: ComponentFixture<DppOscuroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DppOscuroComponent]
    });
    fixture = TestBed.createComponent(DppOscuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
