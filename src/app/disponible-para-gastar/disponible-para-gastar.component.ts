import { Component, OnInit } from '@angular/core';
import { WalletAPIService } from '../wallet-api.service';
import { AccountService } from '../accounts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-disponible-para-gastar',
  templateUrl: './disponible-para-gastar.component.html',
  styleUrls: ['./disponible-para-gastar.component.css']
})

export class DisponibleParaGastarComponent implements OnInit {
  selectedAccount: string = '';
  availableBalance: number = 0;
  accounts: { name: string, balance: number, active: boolean }[] = [];

  constructor(private router: Router, private walletService: WalletAPIService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccounts();
  }
  onAccountChange() {
    const selectedAccount = this.getSelectedAccount();
    if (selectedAccount) {
      this.availableBalance = selectedAccount.balance;
    }
  }

  navigateToNewAccountForm() {
    this.router.navigate(['/nuevaCuenta']);
  }

  toggleAccount() {
    const userId = localStorage.getItem('userId');


    if (userId !== null) {
      console.log('ID del usuario:', userId);
      const selectedAccount = this.getSelectedAccount();
      if (selectedAccount) {
        selectedAccount.active = !selectedAccount.active;
        this.accountService.updateAccountBalance(userId, selectedAccount.name, selectedAccount.balance);
        this.accountService.notifyAccountStatusChanged();
      }
    } else {
      console.error('No se encontró el ID del usuario en el localStorage');

    }
  
  }

  isAccountActive(accountName: string): boolean {
    const account = this.accounts.find(account => account.name === accountName);
    return !!account && account.active;
  }

  getSelectedAccount(): { name: string, balance: number, active: boolean } | undefined {
    return this.accounts.find(account => account.name === this.selectedAccount);
  }

  getAccounts(): void {
    // Llama al servicio para obtener las cuentas del usuario
    const userId = localStorage.getItem('userId');

    if (userId !== null) {
      console.log('ID del usuario:', userId);
      this.walletService.getUserWallets(userId).subscribe(
        (response) => {
          // Estructura las cuentas según la respuesta del servicio
          this.accounts = response.map((wallet: any) => ({
            name: wallet.walletName,
            balance: wallet.balance,
            active: true // Asume que todas las cuentas son activas inicialmente
          }));
        },
        (error) => {
          console.error('Error al obtener las cuentas del usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del usuario en el localStorage');
    }
  }

}
