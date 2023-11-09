import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = {
    nombreUsuario: '',
    contrasena: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Recuperar la lista actual de usuarios desde localStorage (si existe)
    const usuariosRegistradosString = localStorage.getItem('usuarios');
    const usuariosRegistrados = usuariosRegistradosString ? JSON.parse(usuariosRegistradosString) : [];

    // Verificar las credenciales del usuario
    const usuarioAutenticado = usuariosRegistrados.find((u: any) => u.nombreUsuario === this.usuario.nombreUsuario && u.contrasena === this.usuario.contrasena);

    if (usuarioAutenticado) {
      // Autenticación exitosa, redirige al usuario a la página principal
      this.router.navigate(['/inicio']);
    } else {
      // Autenticación fallida, puedes mostrar un mensaje de error
      console.log('Inicio de sesión fallido. Verifica tus credenciales.');
    }
  }
}
