// account.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WalletAPIService } from './wallet-api.service';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  active: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private userAccounts: { [userId: string]: { name: string, balance: number, active: boolean }[] } = {};
  accountStatusChanged = new BehaviorSubject<void>(undefined);
  accountStatusChanged$: Observable<void> = this.accountStatusChanged.asObservable();
  private walletArraySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public walletArray$: Observable<any[]> = this.walletArraySubject.asObservable();
  constructor(private walletService: WalletAPIService) { }
  private totalBalanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalBalance$: Observable<number> = this.totalBalanceSubject.asObservable();


  crearNuevaCuenta(walletData: any): Observable<void> {
    return this.walletService.crearWallet(walletData).pipe(
      map((newWallet: any) => {
        // Verifica si ya existe una billetera con el mismo nombre
        const walletNameExists = this.walletArraySubject.value.some(
          (wallet) => wallet.name === newWallet.name
        );

        if (!walletNameExists) {
          // Agrega la nueva billetera al arreglo existente
          const currentWallets = this.walletArraySubject.value.slice();
          currentWallets.push({
            id: newWallet._id,
            name: newWallet.name,
            balance: newWallet.balance,
            currency: newWallet.currency,
            active: true
          });

          // Actualiza el arreglo y emite el nuevo estado
          this.walletArraySubject.next(currentWallets);

          // Devuelve la nueva billetera
          return newWallet;
        } else {
          // Si ya existe una billetera con el mismo nombre, puedes manejarlo según tus necesidades
          throw new Error('Ya existe una billetera con el mismo nombre.');
        }
      })
    );
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

  loadUserWallets(): Observable<any[]> {
    return this.walletService.getUserWallets("6492f433139a79cae6a3149e").pipe(
      map((response: any[]) => {
        const transformedWalletArray = response.map((wallet: any) => ({
          id: wallet._id,
          name: wallet.name,
          balance: wallet.balance,
          currency: wallet.currency,
          active: true
        }));

        this.walletArraySubject.next(transformedWalletArray);
        return transformedWalletArray;
      })
    );
  }

  sumarBalance(idWallet: string, balanceToAdd: number): void {
    const walletArray = this.walletArraySubject.value.slice();
    let i = 0;
    while (i < walletArray.length) {
      if (walletArray[i].id === idWallet) {

        const balanceToAddAsNumber = typeof balanceToAdd === 'number' ? balanceToAdd : parseFloat(balanceToAdd);
        if (!isNaN(balanceToAddAsNumber)) {
          walletArray[i].balance = +walletArray[i].balance + +balanceToAdd;
        } else {
          console.error('No se pudo convertir balanceToAdd a número:', balanceToAdd);
        }
        break;
      }
      i++;
    }
    this.walletArraySubject.next(walletArray);
  }



  restarBalance(idWallet: string, balanceToSubtract: number): void {
    const walletArray = this.walletArraySubject.value.slice();
    let i = 0;
    while (i < walletArray.length) {
      if (walletArray[i].id === idWallet) {
        walletArray[i].balance = Math.max(0, walletArray[i].balance - balanceToSubtract);
        break;
      }
      i++;
    }
    this.walletArraySubject.next(walletArray);
  }


  updateTotalBalance(newTotalBalance: number): void {
    this.totalBalanceSubject.next(newTotalBalance);
  }

  borrarWallet(id: string): void {
    const walletArray = this.walletArraySubject.value;

    const nuevaWalletArray = walletArray.filter((Wallet) => Wallet.id !== id);

    this.walletArraySubject.next(nuevaWalletArray);
  }

  
  removeDuplicatesFromWalletArray(): void {
    const walletArray = this.walletArraySubject.value.slice();
  
    console.log('Antes de eliminar duplicados:', walletArray);

    // Utilizando un Set para almacenar nombres únicos
    const uniqueNames = new Set<string>();
    const uniqueWalletArray = walletArray.filter((wallet: any) => {
      if (!uniqueNames.has(wallet.name)) {
        uniqueNames.add(wallet.name);
        return true;
      }
      return false;
    });
  
    console.log('Después de eliminar duplicados:', uniqueWalletArray);
  
    this.walletArraySubject.next(uniqueWalletArray);
  }
}
