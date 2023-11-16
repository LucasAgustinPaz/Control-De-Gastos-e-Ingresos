import { Component } from '@angular/core';
import { WalletAPIService } from '../wallet-api.service';
import { AccountService } from '../accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-cuenta',
  templateUrl: './nueva-cuenta.component.html',
  styleUrls: ['./nueva-cuenta.component.css']
})

export class NuevaCuentaComponent {
  // Propiedades para almacenar datos del nuevo formulario
  newAccountName: string = '';
  newAccountBalance: number = 0;
  selectedCurrency: string = 'ARS';

  constructor(private router: Router, private walletService: WalletAPIService, private accountService: AccountService) { }

  // Método para manejar la creación de una nueva cuenta
  crearNuevaCuenta(cuentaNombre: string, moneda: string, balance1: number): void {
     const accountData = {
      name: cuentaNombre,
      usersIds: [
        '6492f433139a79cae6a3149e'
      ],
      currency: moneda, // Cambia a 'ARS' para pesos argentinos
      balance: balance1}

      this.walletService.crearWallet(accountData).subscribe(
      //this.accountService.crearNuevaCuenta('6492f433139a79cae6a3149e', cuentaNombre, moneda, balance).subscribe(
        () => {
          // La cuenta se creó con éxito
          console.log('Nueva cuenta creada con éxito.');
          this.router.navigate(['/']);
        },
        (error) => {
          // Maneja el error al crear la cuenta (por ejemplo, muestra un mensaje al usuario)
          console.error('Error al crear nueva cuenta:', error);
        }
      ); 
  }
}
