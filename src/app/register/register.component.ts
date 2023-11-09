import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario = {
    nombreUsuario: '',
    correoElectronico: '',
    contrasena: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    // Recuperar la lista actual de usuarios desde localStorage (si existe)
    const usuariosRegistradosString = localStorage.getItem('usuarios');
    const usuariosRegistrados = usuariosRegistradosString ? JSON.parse(usuariosRegistradosString) : [];


    // Agregar el nuevo usuario a la lista
    usuariosRegistrados.push(this.usuario);

    // Almacenar la lista actualizada en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    // Redirigir al usuario a la página de inicio de sesión después de un registro exitoso
    this.router.navigate(['/']);
  }
}
