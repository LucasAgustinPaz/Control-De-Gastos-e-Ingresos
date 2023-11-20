// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletAPIService } from '../wallet-api.service';

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

  constructor(private router: Router, private walletService: WalletAPIService) {}

  onSubmit() {
    this.walletService.iniciarSesion(this.usuario.email, this.usuario.contrasena).subscribe(
      (datos: any) => {
        console.log('Inicio de sesión exitoso:', datos);
      
        // Guarda el mail en memoria local
        const userId = this.usuario.email;
        localStorage.setItem('userId', userId);

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
