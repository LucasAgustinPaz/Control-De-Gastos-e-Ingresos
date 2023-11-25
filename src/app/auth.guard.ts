// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WalletAPIService } from './wallet-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private walletService: WalletAPIService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    // Obtener el userId del servicio WalletAPIService
    const authFlag = this.walletService.existeUser();
    console.log("user:",authFlag);

    if (authFlag != '1') {
      // Si no hay userId, redirigir al usuario a la página de inicio de sesión
      window.alert('No has iniciado sesión. Se requiere iniciar sesión para el ingreso.');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
