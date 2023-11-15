// datos-wallet.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosWalletService {
  private selectedAccountSubject = new BehaviorSubject<string>('');
  selectedAccount$: Observable<string> = this.selectedAccountSubject.asObservable();

  updateSelectedAccount(accountName: string): void {
    this.selectedAccountSubject.next(accountName);
  }
}
