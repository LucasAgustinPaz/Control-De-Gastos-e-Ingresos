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
    const email = next.params['email'];
    const password = next.params['password'];

    return this.walletService.iniciarSesion(email, password).pipe(
      map((response) => {
        const isAuthenticated = response && response.token;

        if (isAuthenticated) {
          return true;
        } else {
          window.alert('No has iniciado sesión. Se requiere iniciar sesión para el ingreso.');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        window.alert('Error al intentar iniciar sesión. Inténtalo de nuevo.');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
