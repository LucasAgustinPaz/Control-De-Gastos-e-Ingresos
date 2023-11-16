import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOscuroComponent } from './login-oscuro.component';

describe('LoginOscuroComponent', () => {
  let component: LoginOscuroComponent;
  let fixture: ComponentFixture<LoginOscuroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginOscuroComponent]
    });
    fixture = TestBed.createComponent(LoginOscuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
