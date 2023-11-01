import { TestBed } from '@angular/core/testing';

import { WalletAPIService } from './wallet-api.service';

describe('WalletAPIService', () => {
  let service: WalletAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
