import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletAPIService } from '../wallet-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuarioData = {
    name: '',
    email: '',
    cellphone: '',
    password: '',
  };

  constructor(private router: Router, private walletService: WalletAPIService) {}

  onSubmit() {
    this.walletService.crearUsuario(this.usuarioData).subscribe(
      (response: any) => {
        console.log('Usuario creado con éxito:', response);
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }
}
