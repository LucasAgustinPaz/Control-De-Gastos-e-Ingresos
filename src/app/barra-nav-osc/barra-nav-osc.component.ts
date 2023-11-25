import { Component } from '@angular/core';
import { WalletAPIService } from '../wallet-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-nav-osc',
  templateUrl: './barra-nav-osc.component.html',
  styleUrls: ['./barra-nav-osc.component.css']
})
export class BarraNavOScComponent {

constructor(private router: Router, private walletService: WalletAPIService) {}


mostrarMenu: boolean = false;

cerrarSesion(): void {
  // Llama a la función de cerrar sesión del servicio
  this.walletService.cerrarSesion();
  this.router.navigate(['/login']);
}

}