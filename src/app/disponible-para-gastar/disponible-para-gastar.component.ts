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
  accounts: {id: string,  name: string, balance: number, currency: string, active: boolean }[] = [];
  totalBalance: number = 0; // Agregamos una propiedad para el total
  wallets: { id: string, name: string, balance: number, currency: string, active: boolean }[] = [];
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
        // Realiza acciones adicionales si es necesario
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

  toggleAccount() {

      const selectedAccount = this.getSelectedAccount();
      if (selectedAccount) {
        selectedAccount.active = !selectedAccount.active;
       // this.accountService.updateAccountBalance("6492f433139a79cae6a3149e", selectedAccount.name, selectedAccount.balance);
        this.accountService.notifyAccountStatusChanged();
        this.updateTotalBalance();
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
      this.walletService.getUserWallets("6492f433139a79cae6a3149e").subscribe(
        (response: any[]) => {
          console.log("Respuesta de get user wallets: ", response);
          this.accounts = response.map((wallet: any) => ({
            id: wallet._id,
            name: wallet.name,
            balance: wallet.balance,
            currency: wallet.currency,
            active: true
          }));
          console.log("Cuentas:", this.accounts);
          this.updateTotalBalance();
        },
        (error) => {
          console.error('Error al obtener las cuentas del usuario:', error);
        }
      );
  }

  /*getAccounts(): void {
    // Comentamos la llamada al servicio para obtener las cuentas reales
    // const userId = localStorage.getItem('userId');
  
    // Comentamos el bloque condicional
    // if (userId !== null) {
    //   console.log('ID del usuario:', userId);
  
    // Hardcodeamos cuentas de prueba
    const hardcodedAccounts = [
      { name: 'Cuenta 1', balance: 1000, currency: 'USD', active: true },
      { name: 'Cuenta 2', balance: 500, currency: 'EUR', active: true },
      // Agrega más cuentas según sea necesario
    ];
  
    // Asignamos las cuentas de prueba al arreglo de cuentas
    this.accounts = hardcodedAccounts;
  
    // Log para verificar las cuentas de prueba
    console.log("Cuentas de prueba:", this.accounts);
  
    // Llamamos a la función para calcular la suma de los balances
    this.updateTotalBalance();
    // } else {
    //   console.error('No se encontró el ID del usuario en el localStorage');
    // }
  }*/


  // Método para calcular la suma de los saldos
  updateTotalBalance(): void {
    this.totalBalance = this.accounts.reduce((sum, account) => sum + account.balance, 0);
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
    


