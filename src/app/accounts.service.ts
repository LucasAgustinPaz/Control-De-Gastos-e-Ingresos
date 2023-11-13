import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WalletAPIService } from './wallet-api.service';
import { throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Almacena las cuentas de usuario con su estado (nombre, saldo y estado de activación)
  private userAccounts: { [userId: string]: { name: string, balance: number, active: boolean }[] } = {};

  // Observable que notifica cambios en el estado de la cuenta
  accountStatusChanged = new BehaviorSubject<void>(undefined);

  // Observable basado en BehaviorSubject para consumir cambios en el estado de la cuenta
  accountStatusChanged$: Observable<void> = this.accountStatusChanged.asObservable();

  constructor(private walletService: WalletAPIService) { }

/*   // Inicializa las cuentas de usuario con un ID de usuario y un array de cuentas iniciales con nombres y saldos
  createUserAccounts(userId: string, initialAccounts: { name: string, balance: number }[]): void {
    if (!this.userAccounts[userId]) {
      this.userAccounts[userId] = initialAccounts.map(account => ({ ...account, active: true }));
      this.createWalletsForUser(userId, initialAccounts);
    }
  } */

/*   // Método privado que crea billeteras para un usuario dado utilizando el servicio WalletAPIService
  private createWalletsForUser(userId: string, initialAccounts: { name: string, balance: number }[]): void {
    initialAccounts.forEach(account => this.createWalletForAccount(userId, account));
  } */

  crearNuevaCuenta(userId: string, cuentaNombre: string, moneda: string, balance: number): Observable<void> {
    // Verifica si el nombre de la cuenta ya existe
    const cuentaExistente = this.userAccounts[userId]?.find(account => account.name === cuentaNombre);

    if (cuentaExistente) {
      // Si la cuenta ya existe, lanza un error o toma la acción que desees
      return throwError('El nombre de la cuenta ya existe.');
    }

    // Si la cuenta no existe, crea una nueva cuenta con saldo inicial cero y la marca como activa
    const nuevaCuenta = { name: cuentaNombre, balance: 0, active: true };

    // Agrega la nueva cuenta a la lista de cuentas del usuario
    this.userAccounts[userId] = [...(this.userAccounts[userId] || []), nuevaCuenta];

    // Crea la billetera asociada a la nueva cuenta
    this.createWalletForAccount(userId, cuentaNombre, moneda, balance);

    // Notifica que ha habido un cambio en el estado de la cuenta
    this.notifyAccountStatusChanged();

    // Devuelve un observable vacío para indicar que la operación se realizó con éxito
    return of(undefined);
  }
  // Método privado que crea una billetera para una cuenta específica
  private createWalletForAccount(userId: string, name: string, moneda: string, balance: number): void {
 

    // Llama al servicio para crear una billetera y maneja las respuestas y errores
    this.walletService.crearWallet({ userId, walletName: name, balance }).subscribe(
      (response) => console.log('Billetera creada con éxito:', response),
      (error) => console.error('Error al crear billetera:', error)
    );
  }

  // Actualiza el saldo de una cuenta y refleja el cambio en la billetera
  updateAccountBalance(userId: string, accountName: string, newBalance: number): void {
    const account = this.findAccount(userId, accountName);

    if (account) {
      account.balance = newBalance;
      this.updateWalletBalance(userId, accountName, newBalance);
      this.notifyAccountStatusChanged();
    }
  }

  // Método privado que actualiza el saldo en la billetera utilizando el servicio WalletAPIService
  private updateWalletBalance(userId: string, accountName: string, newBalance: number): void {
    const wallet = this.findWallet(userId, accountName);

    if (wallet) {
      const { walletId, token } = wallet;
      const value = newBalance.toString();

      // Llama al servicio para actualizar el saldo de la billetera y maneja las respuestas y errores
      this.walletService.updateWallet(walletId, token, value, {}).subscribe(
        (response) => console.log('Saldo de billetera actualizado con éxito:', response),
        (error) => console.error('Error al actualizar saldo de billetera:', error)
      );
    }
  }

  // Cambia el estado de activación de una cuenta
  toggleAccountStatus(userId: string, accountName: string): void {
    const account = this.findAccount(userId, accountName);

    if (account) {
      account.active = !account.active;
      this.notifyAccountStatusChanged();
    }
  }

  // Obtiene cuentas activas para un usuario
  getActiveAccounts(userId: string): { name: string, balance: number, active: boolean }[] {
    const userAccounts = this.userAccounts[userId] || [];
    return userAccounts.filter(account => account.active);
  }

  // Notifica cambios en el estado de la cuenta
  notifyAccountStatusChanged(): void {
    this.accountStatusChanged.next();
  }

  // Método privado para encontrar una cuenta por nombre
  private findAccount(userId: string, accountName: string): { name: string, balance: number, active: boolean } | undefined {
    const userAccounts = this.userAccounts[userId];
    return userAccounts?.find(account => account.name === accountName);
  }

  // Método privado para encontrar una billetera por nombre
  private findWallet(userId: string, walletName: string): { walletId: string, token: string } | undefined {
    // Llama al servicio para obtener las billeteras del usuario y maneja las respuestas y errores
    const wallets$ = this.walletService.getUserWallets(userId);

    wallets$.subscribe(
      (wallets) => {
        const wallet = wallets.find((w: any) => w.walletName === walletName);
        if (wallet) {
          // Realiza la lógica con la billetera encontrada
          const { walletId, token } = wallet;
          console.log('Billetera encontrada:', wallet);
        } else {
          console.log('Billetera no encontrada');
        }
      },
      (error) => {
        console.error('Error al obtener billeteras del usuario:', error);
      }
    );

    return undefined; // Cambiar esto según lo que quieras devolver en caso de que la búsqueda falle
  }

}
