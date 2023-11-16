import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavOScComponent } from './barra-nav-osc.component';

describe('BarraNavOScComponent', () => {
  let component: BarraNavOScComponent;
  let fixture: ComponentFixture<BarraNavOScComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraNavOScComponent]
    });
    fixture = TestBed.createComponent(BarraNavOScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
