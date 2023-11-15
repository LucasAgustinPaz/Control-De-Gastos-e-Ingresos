// account.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WalletAPIService } from './wallet-api.service';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userAccounts: { [userId: string]: { name: string, balance: number, active: boolean }[] } = {};
  accountStatusChanged = new BehaviorSubject<void>(undefined);
  accountStatusChanged$: Observable<void> = this.accountStatusChanged.asObservable();

  constructor(private walletService: WalletAPIService) { }

  crearNuevaCuenta(userId: string, cuentaNombre: string, moneda: string, balance: number): Observable<void> {
    const cuentaExistente = this.userAccounts[userId]?.find(account => account.name === cuentaNombre);

    if (cuentaExistente) {
      return throwError('El nombre de la cuenta ya existe.');
    }

    const nuevaCuenta = { name: cuentaNombre, balance: 0, active: true };
    this.userAccounts[userId] = [...(this.userAccounts[userId] || []), nuevaCuenta];

    this.createWalletForAccount(userId, cuentaNombre, moneda, balance);
    this.notifyAccountStatusChanged();

    return of(undefined);
  }

  private createWalletForAccount(userId: string, name: string, moneda: string, balance: number): void {
    this.walletService.crearWallet({ userId, walletName: name, balance }).subscribe(
      (response) => {
        console.log('Billetera creada con éxito:', response);
      },
      (error) => {
        console.error('Error al crear billetera:', error);
      },
      () => {
        console.log('La suscripción a la creación de la billetera se completó.');
      }
    );
  }

  updateAccountBalance(userId: string, accountName: string, newBalance: number): void {
    const account = this.findAccount(userId, accountName);

    if (account) {
      account.balance = newBalance;
      this.updateWalletBalance(userId, accountName, newBalance);
      this.notifyAccountStatusChanged();
    }
  }

  private updateWalletBalance(userId: string, accountName: string, newBalance: number): void {
    this.findWallet(userId, accountName).subscribe(
      (wallet) => {
        if (wallet) {
          const { walletId, token } = wallet;
          const value = newBalance.toString();

          this.walletService.updateWallet(walletId, token, value, {}).subscribe(
            (response) => console.log('Saldo de billetera actualizado con éxito:', response),
            (error) => console.error('Error al actualizar saldo de billetera:', error)
          );
        } else {
          console.error('Billetera no encontrada');
        }
      },
      (error) => {
        console.error('Error al obtener billeteras del usuario:', error);
      }
    );
  }

  toggleAccountStatus(userId: string, accountName: string): void {
    const account = this.findAccount(userId, accountName);

    if (account) {
      account.active = !account.active;
      this.notifyAccountStatusChanged();
    }
  }

  getActiveAccounts(userId: string): { name: string, balance: number, active: boolean }[] {
    const userAccounts = this.userAccounts[userId] || [];
    return userAccounts.filter(account => account.active);
  }

  notifyAccountStatusChanged(): void {
    this.accountStatusChanged.next();
  }

  private findAccount(userId: string, accountName: string): { name: string, balance: number, active: boolean } | undefined {
    const userAccounts = this.userAccounts[userId];
    return userAccounts?.find(account => account.name === accountName);
  }

  private findWallet(userId: string, walletName: string): Observable<{ walletId: string, token: string } | undefined> {
    return this.walletService.getUserWallets(userId).pipe(
      map((wallets: any[]) => {
        const wallet = wallets.find((w: any) => w.walletName === walletName);
        if (wallet) {
          const { walletId, token } = wallet;
          console.log('Billetera encontrada:', wallet);
          return { walletId, token };
        } else {
          console.log('Billetera no encontrada');
          return undefined;
        }
      }),
      catchError((error) => {
        console.error('Error al obtener billeteras del usuario:', error);
        return of(undefined);
      })
    );
  }
}
