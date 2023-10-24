import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraInferiorNavComponent } from './barra-inferior-nav.component';

describe('BarraInferiorNavComponent', () => {
  let component: BarraInferiorNavComponent;
  let fixture: ComponentFixture<BarraInferiorNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraInferiorNavComponent]
    });
    fixture = TestBed.createComponent(BarraInferiorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
