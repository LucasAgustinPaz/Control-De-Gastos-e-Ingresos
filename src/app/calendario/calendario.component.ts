import { Component } from '@angular/core';
import { CalendarioService } from '../calendario.service';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  hasEvents: boolean;
  events: CalendarEvent[];
  // Otras propiedades según sea necesario
}

export interface CalendarEvent {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  // Otras propiedades según sea necesario
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})

export class CalendarioComponent {
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  years: number[] = [2022, 2023, 2024,2025]; // Puedes ajustar según tus necesidades

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  
  // Nueva propiedad para gestionar la visibilidad de los detalles
  isDetailsVisible: boolean = false;

  // Nueva propiedad para almacenar eventos del día seleccionado
  selectedDayEvents: any[] = [];
  
  // Nueva propiedad para almacenar el día seleccionado
  selectedDay: any;

  constructor(private calendarioService: CalendarioService) {}

  getWeeksInMonth(month: number, year: number): number[] {
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const daysInMonth = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    return Array.from({ length: totalCells / 7 }, (_, index) => index + 1);
  }

  getDaysInMonth(month: number, year: number, week: number): CalendarDay[] {
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = Array.from({ length: 7 }, (_, index) => (week - 1) * 7 + index + 1);

  return daysArray.map(day => {
    const date = new Date(year, month - 1, day);
    const isCurrentMonth = date.getMonth() + 1 === month;
    const isSelected = false; // Puedes ajustar esto según tu lógica
    const hasEvents = false; // Puedes ajustar esto según tu lógica
    const events: CalendarEvent[] = []; // Puedes ajustar esto según tu lógica

    return { date, isCurrentMonth, isSelected, hasEvents, events };
  });
}


  closeDetails(): void {
    this.isDetailsVisible = false;
    this.selectedDayEvents = [];
    this.selectedDay = null;
  }
  
  onDayClick(day: CalendarDay): void {
    const selectedDate = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
    const events = this.calendarioService.getEventsForDate(selectedDate);

    // Asignar valores a las nuevas propiedades
    this.selectedDay = { date: selectedDate, isCurrentMonth: true, isSelected: true };
    this.isDetailsVisible = true;
    this.selectedDayEvents = events;
  }
}

