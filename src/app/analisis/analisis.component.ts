// analisis.component.ts

import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../transacciones.service';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css'],
})
export class AnalisisComponent implements OnInit {
  transacciones: any[] = [];
  ingresos: any[] = [];
  gastos: any[] = [];

  constructor(private transaccionesService: TransaccionesService) {}

  ngOnInit(): void {
    this.transaccionesService.transaccionesArray$.subscribe(
      (transacciones: any[]) => {
        this.transacciones = transacciones;
        this.separarTransacciones();
      },
      (error) => {
        console.error('Error al recibir transacciones:', error);
      }
    );
  }

  private separarTransacciones(): void {
    this.ingresos = this.transacciones.filter((transaccion) => transaccion.amount > 0);
    this.gastos = this.transacciones.filter((transaccion) => transaccion.amount < 0);
  }
}
