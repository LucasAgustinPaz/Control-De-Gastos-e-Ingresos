// inicio.component.ts

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  totalBalance: number = 0;
  accounts: { id: string,name: string, balance: number, currency: string, active: boolean }[] = [];
  constructor(private accountService: AccountService) {}

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
  }
  

  calculateTotalBalance() {
    const userId = localStorage.getItem('userId');

    if (userId !== null) {
      console.log('ID del usuario:', userId);
      const activeAccounts = this.accountService.getActiveAccounts(userId);
      this.totalBalance = activeAccounts.reduce((total, account) => total + account.balance, 0);
    } else {
      console.error('No se encontró el ID del usuario en el localStorage');
    }
  }
}
