import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts.service'; // Ajusta la ruta al servicio

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
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
