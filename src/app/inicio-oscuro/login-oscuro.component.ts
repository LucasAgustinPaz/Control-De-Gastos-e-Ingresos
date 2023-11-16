import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-login-oscuro',
  templateUrl: './login-oscuro.component.html',
  styleUrls: ['./login-oscuro.component.css']
})
export class LoginOscuroComponent {
  balanceTotal: number = 0;
  accounts: { id: string, name: string, balance: number, currency: string, active: boolean }[] = [];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.walletArray$.subscribe(
      (walletArray: any[]) => {
        this.accounts = walletArray;
        console.log("cuentas llegaron", this.accounts);
        // Realiza acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al recibir actualizaciones del array de billeteras:', error);
      }
    );

    this.accountService.totalBalance$.subscribe((totalBalance: number) => {
      this.balanceTotal = totalBalance;
    });

    console.log("Plata Total: ", this.balanceTotal);
    this.accountService.removeDuplicatesFromWalletArray();
  }
}

