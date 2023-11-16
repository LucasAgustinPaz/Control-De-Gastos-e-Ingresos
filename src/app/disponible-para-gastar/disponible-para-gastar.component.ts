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
  accounts: { id: string, name: string, balance: number, currency: string, active: boolean }[] = [];
  totalBalance: number = 0; // Agregamos una propiedad para el total
  wallets: { id: string, name: string, balance: number, currency: string, active: boolean }[] = [];
  balanceTotal: number = 0;

  constructor(private router: Router, private walletService: WalletAPIService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.walletArray$.subscribe(
      (walletArray: any[]) => {
        this.accounts = walletArray;
        console.log("cuentas llegaron dpg", this.accounts);
        // Realiza acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al recibir actualizaciones del array de billeteras:', error);
      }
    );
  }

  onAccountChange() {
    this.accountService.walletArray$.subscribe(
      (walletArray: any[]) => {
        this.accounts = walletArray;
        console.log("cuentas llegaron dpg", this.accounts);
      },
      (error) => {
        console.error('Error al recibir actualizaciones del array de billeteras:', error);
      }
    );
    const selectedAccount = this.getSelectedAccount();
    if (selectedAccount) {
      this.availableBalance = selectedAccount.balance;
    }
  }

  navigateToNewAccountForm() {
    this.router.navigate(['/nuevaCuenta']);
  }

  toggleAccount(accountName: string): void {
    const selectedAccount = this.getSelectedAccount();
    if (selectedAccount) {
      selectedAccount.active = !selectedAccount.active;
      this.accountService.notifyAccountStatusChanged();
      this.updateTotalBalance();
    }
  }
  


  // Modifica la firma de la función isAccountActive para aceptar un nombre de cuenta
isAccountActive(accountName: string): boolean {
  const account = this.accounts.find(account => account.name === accountName);
  return !!account && account.active;
}


  getSelectedAccount(): { name: string, balance: number, active: boolean } | undefined {
    return this.accounts.find(account => account.name === this.selectedAccount);
  }

  getAccounts(): void {
    this.accounts.forEach(cuenta => {
      this.balanceTotal += cuenta.balance;
    });

    console.log("Plata Total: ", this.balanceTotal);
  }

  confirmarEliminarCuenta(): void {
    const selectedAccount = this.getSelectedAccount();

    if (selectedAccount) {
      const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la cuenta ${selectedAccount.name}?`);

      if (confirmacion) {
        this.eliminarCuenta();
      }
    }
  }

  updateTotalBalance(): void {
    this.balanceTotal = this.accounts
      .filter(cuenta => cuenta.active) // Solo considera cuentas activas
      .reduce((sum, cuenta) => {
        if (typeof cuenta.balance === 'number') {
          return sum + cuenta.balance;
        } else if (typeof cuenta.balance === 'string') {
          const balanceAsNumber = parseFloat(cuenta.balance);
          if (!isNaN(balanceAsNumber)) {
            return sum + balanceAsNumber;
          } else {
            console.error('No se pudo convertir cuenta.balance a número:', cuenta.balance);
            return sum;
          }
        } else {
          console.error('cuenta.balance no es ni número ni cadena:', cuenta.balance);
          return sum;
        }
      }, 0);
  
    // Actualiza el balance total en el servicio compartido
    this.accountService.updateTotalBalance(this.balanceTotal);
  }
  

  eliminarCuenta(): void {
    // Llama a loadUserWallets para cargar el array observable

    this.accountService.loadUserWallets().subscribe(
      (walletArray: any[]) => {
        this.accounts = walletArray;
        // Realiza acciones adicionales si es necesario
        console.log("hol", this.accounts);
      },
      (error) => {
        console.error('Error al cargar las billeteras del usuario:', error);
      }
    );
  }
}



