import { TestBed } from '@angular/core/testing';

import { DatosWalletService } from './datos-wallet.service';

describe('DatosWalletService', () => {
  let service: DatosWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
