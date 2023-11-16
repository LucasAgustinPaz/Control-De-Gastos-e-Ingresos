// inicio.component.ts

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  balanceTotal: number = 0;
  accounts: { id: string, name: string, balance: number, currency: string, active: boolean }[] = [];
  constructor(private router: Router, private accountService: AccountService) { }

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

  redirigirAComponenteMeta() {
    // Aquí defines la ruta a la que quieres redirigir al usuario cuando haga clic en el componente app-caja2
    this.router.navigate(['/ruta-de-destino']);
  }
}

/*ngOnInit(): void {
  this.accountService.walletArray$.subscribe(
    async (walletArray: any[]) => {
      this.accounts = walletArray;
      console.log("Cuentas llegaron", this.accounts);
      
      // Espera durante 2 segundos
      await this.delay(2000);
      
      // Llama a la función para eliminar duplicados después de esperar
      this.accountService.removeDuplicatesFromWalletArray();
      
      // Realiza acciones adicionales si es necesario
    },
    (error) => {
      console.error('Error al recibir actualizaciones del array de billeteras:', error);
    }
  );

this.accountService.totalBalance$.subscribe((totalBalance: number) => {
  this.balanceTotal = totalBalance;
});
}

private delay(ms: number): Promise < void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/
