// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletAPIService } from '../wallet-api.service';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = {
    email: '', // Ajusta según la estructura de tu servicio
    contrasena: ''
  };
  accounts: { id: string, name: string, balance: number, currency: string, active: boolean }[] = [];
  constructor(private router: Router, private walletService: WalletAPIService, private accountService: AccountService) {}

  onSubmit() {
    this.walletService.iniciarSesion(this.usuario.email, this.usuario.contrasena).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        // Guarda el mail en memoria local
        const userId = this.usuario.email;
        localStorage.setItem('userId', userId);
        this.accountService.loadUserWallets().subscribe(
          (wallets: any[]) => {
            // Actualiza el arreglo accounts con los datos recibidos
            this.accounts = wallets;
          },
          (error) => {
            console.error('Error al cargar las cuentas del usuario:', error);
          }
        );
        // Redirige al usuario a la página principal después de iniciar sesión
        this.router.navigate(['/inicio']);
      },
      (error: any) => {
        console.error('Inicio de sesión fallido. Verifica tus credenciales.', error);
        // Puedes manejar el error aquí (por ejemplo, mostrar un mensaje de error al usuario)
      }
    );
  }
}
