// caja.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {
  @Input() titulo: string = '';
  @Input() valor: string = '';
  @Input() balance: string = '';
  @Input() totalBalance: number = 0;

  constructor() { }
}
