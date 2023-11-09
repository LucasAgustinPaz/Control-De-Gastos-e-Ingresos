import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  selectedAccountName: string = '';
  accounts = [
    { name: 'Cuenta 1', balance: 5000, active: true },
    { name: 'Cuenta 2', balance: 2000, active: true },
    // Agrega más cuentas y saldos si es necesario
  ];

  // Cambia de privada a pública
  accountStatusChanged = new BehaviorSubject<void>(undefined);

  accountStatusChanged$: Observable<void> = this.accountStatusChanged.asObservable();

  constructor() {}

  getAccounts() {
    return this.accounts;
  }

  updateAccountBalance(accountName: string, newBalance: number) {
    const account = this.accounts.find(account => account.name === accountName);
    if (account) {
      account.balance = newBalance;
    }
  }

  toggleAccountStatus(accountName: string) {
    const account = this.accounts.find(account => account.name === accountName);
    if (account) {
      account.active = !account.active;
      this.notifyAccountStatusChanged();
    }
  }

  getActiveAccounts(): { name: string, balance: number, active: boolean }[] {
    return this.accounts.filter(account => account.active);
  }

  notifyAccountStatusChanged() {
    this.accountStatusChanged.next();
  }
}
