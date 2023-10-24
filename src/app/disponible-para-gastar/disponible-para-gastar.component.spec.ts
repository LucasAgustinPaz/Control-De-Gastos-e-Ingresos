import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibleParaGastarComponent } from './disponible-para-gastar.component';

describe('DisponibleParaGastarComponent', () => {
  let component: DisponibleParaGastarComponent;
  let fixture: ComponentFixture<DisponibleParaGastarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibleParaGastarComponent]
    });
    fixture = TestBed.createComponent(DisponibleParaGastarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
