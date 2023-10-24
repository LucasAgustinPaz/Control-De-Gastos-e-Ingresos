import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-general',
  templateUrl: './titulo-general.component.html',
  styleUrls: ['./titulo-general.component.css']
})
export class TituloGeneralComponent {
  @Input() titulo: string = 'Titulo predeterminado';
}
