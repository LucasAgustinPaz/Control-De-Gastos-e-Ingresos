import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CalendarioService {
  private events: any[] = [];

  constructor() {}

  getEventsForDate(date: Date): any[] {
    return this.events.filter((event) => this.isSameDay(new Date(event.date), date));
  }

  addEvent(event: any): void {
    this.events.push(event);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
