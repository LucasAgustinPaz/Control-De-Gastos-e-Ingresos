import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {
  @Input() titulo: string = 'Título Predeterminado';
  @Input() valor: string = '$0.00';
  @Input() balance: string = 'Balance Total';
}
