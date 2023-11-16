import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TransaccionesService {
  private transaccionesArraySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  transaccionesArray$: Observable<any[]> = this.transaccionesArraySubject.asObservable();

  constructor() {}

  agregarTransaccion(transaccion: any): void {
    const transaccionesArray = this.transaccionesArraySubject.value;
    transaccionesArray.push(transaccion);
    this.transaccionesArraySubject.next(transaccionesArray);
  }
}

