import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts.service'; // Ajusta la ruta al servicio

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  totalBalance: number = 0;

  constructor(private accountService: AccountService) {
    this.calculateTotalBalance();
  }

  ngOnInit() {
    this.calculateTotalBalance();
    this.accountService.accountStatusChanged.subscribe(() => {
      this.calculateTotalBalance();
    });
  }

  calculateTotalBalance() {
    const activeAccounts = this.accountService.getActiveAccounts();
    this.totalBalance = activeAccounts.reduce((total, account) => total + account.balance, 0);
  }
}
