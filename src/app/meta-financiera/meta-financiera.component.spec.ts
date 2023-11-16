import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaFinancieraComponent } from './meta-financiera.component';

describe('MetaFinancieraComponent', () => {
  let component: MetaFinancieraComponent;
  let fixture: ComponentFixture<MetaFinancieraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetaFinancieraComponent]
    });
    fixture = TestBed.createComponent(MetaFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
