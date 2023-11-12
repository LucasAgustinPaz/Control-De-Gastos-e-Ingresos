import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years: number[] = [2021, 2022, 2023]; // Puedes ajustar según tus necesidades

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;

  getWeeksInMonth(month: number, year: number): number[] {
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const daysInMonth = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    return Array.from({ length: totalCells / 7 }, (_, index) => index + 1);
  }

  getDaysInMonth(month: number, year: number, week: number): number[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: 7 }, (_, index) => (week - 1) * 7 + index + 1);
    return daysArray.filter(day => day <= daysInMonth);
  }
}
