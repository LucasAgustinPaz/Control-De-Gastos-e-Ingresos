// analisis.component.ts
import { Component, OnInit } from '@angular/core';
import { TransaccionesService } from '../transacciones.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Color } from 'chart.js';


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
  ingresosData: ChartDataset[] = [];
  ingresosLabels: string[] = [];

  // Datos para el gráfico de gastos
  gastosData: ChartDataset[] = [];
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
    // Actualizar datos para el gráfico de ingresos
    this.ingresosData = [
      { data: this.ingresos.map(ingreso => ingreso.amount), label: 'Ingresos' }
    ];
    this.ingresosLabels = this.ingresos.map(ingreso => ingreso.title);

    // Actualizar datos para el gráfico de gastos
    this.gastosData = [
      { data: this.gastos.map((gasto) => Math.abs(gasto.amount)), label: 'Gastos' }
    ];
    this.gastosLabels = this.gastos.map((gasto) => gasto.title);
  }
}
