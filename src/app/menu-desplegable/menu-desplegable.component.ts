import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.css']
})
export class MenuDesplegableComponent {
  menuAbierto = false;

  abrirMenu() {
    this.menuAbierto = true;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }
}
