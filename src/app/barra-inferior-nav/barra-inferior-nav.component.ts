// barra-inferior-nav.component.ts
import { Component } from '@angular/core';
import { WalletAPIService } from '../wallet-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-inferior-nav',
  templateUrl: './barra-inferior-nav.component.html',
  styleUrls: ['./barra-inferior-nav.component.css'],
})
export class BarraInferiorNavComponent {
  mostrarMenu: boolean = false;

  constructor(private router: Router, private walletService: WalletAPIService) {}

  cerrarSesion(): void {
    // Llama a la función de cerrar sesión del servicio
    this.walletService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
