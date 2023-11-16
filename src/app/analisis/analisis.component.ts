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

  // Datos para el gráfico de ingresos
  ingresosData: number[] = [];
  ingresosLabels: string[] = [];

  // Datos para el gráfico de gastos
  gastosData: number[] = [];
  gastosLabels: string[] = [];

  constructor(private transaccionesService: TransaccionesService) {}

  ngOnInit(): void {
    this.transaccionesService.transaccionesArray$.subscribe(
      (transacciones: any[]) => {
        this.transacciones = transacciones;
        this.separarTransacciones();
        this.actualizarDatosGraficos();
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

  private actualizarDatosGraficos(): void {
    this.ingresosData = this.ingresos.map((ingreso) => Math.abs(ingreso.amount));
    this.ingresosLabels = this.ingresos.map((ingreso) => ingreso.title);

    this.gastosData = this.gastos.map((gasto) => Math.abs(gasto.amount));
    this.gastosLabels = this.gastos.map((gasto) => gasto.title);
  }
}
