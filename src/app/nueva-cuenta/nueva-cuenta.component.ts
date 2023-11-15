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
  crearNuevaCuenta(cuentaNombre: string, moneda: string, balance: number): void {
    const userId = localStorage.getItem('userId');

    if (userId !== null) {
      console.log('ID del usuario:', userId);
      this.accountService.crearNuevaCuenta('6492f433139a79cae6a3149e', cuentaNombre, moneda, balance).subscribe(
        () => {
          // La cuenta se creó con éxito
          console.log('Nueva cuenta creada con éxito.');
          // Actualiza la lista de cuentas en el componente (puedes llamar a getAccounts o cualquier otro método necesario)
          this.walletService.getUserWallets('6492f433139a79cae6a3149e');
          this.router.navigate(['/']);
        },
        (error) => {
          // Maneja el error al crear la cuenta (por ejemplo, muestra un mensaje al usuario)
          console.error('Error al crear nueva cuenta:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del usuario en el localStorage');
    }
  }
}
