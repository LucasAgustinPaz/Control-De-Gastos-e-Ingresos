import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloGeneralComponent } from './titulo-general.component';

describe('TituloGeneralComponent', () => {
  let component: TituloGeneralComponent;
  let fixture: ComponentFixture<TituloGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TituloGeneralComponent]
    });
    fixture = TestBed.createComponent(TituloGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
