import { Component } from '@angular/core';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-disponible-para-gastar',
  templateUrl: './disponible-para-gastar.component.html',
  styleUrls: ['./disponible-para-gastar.component.css']
})

export class DisponibleParaGastarComponent {
  selectedAccount: string = '';
  availableBalance: number = 0;
  accounts: { name: string, balance: number, active: boolean }[] = [];

  constructor(private accountService: AccountService) {
    this.accounts = this.accountService.getAccounts();
  }

  onAccountChange() {
    const selectedAccount = this.getSelectedAccount();
    if (selectedAccount) {
      this.availableBalance = selectedAccount.balance;
    }
  }

  toggleAccount() {
    const selectedAccount = this.getSelectedAccount();
    if (selectedAccount) {
      selectedAccount.active = !selectedAccount.active;
      this.accountService.updateAccountBalance(selectedAccount.name, selectedAccount.balance);
      this.accountService.notifyAccountStatusChanged();
    }
  }
  
  isAccountActive(accountName: string): boolean {
    const account = this.accounts.find(account => account.name === accountName);
    return !!account && account.active;
  }
  
  getSelectedAccount(): { name: string, balance: number, active: boolean } | undefined {
    return this.accounts.find(account => account.name === this.selectedAccount);
  }
}
