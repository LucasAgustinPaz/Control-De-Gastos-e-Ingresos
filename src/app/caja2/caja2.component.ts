import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-caja2',
  templateUrl: './caja2.component.html',
  styleUrls: ['./caja2.component.css']
})
export class Caja2Component {
  @Input() titulo: string = 'Título Predeterminado';
}
