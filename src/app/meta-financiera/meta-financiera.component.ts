import { Component } from '@angular/core';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-meta-financiera',
  templateUrl: './meta-financiera.component.html',
  styleUrls: ['./meta-financiera.component.css']
})
export class MetaFinancieraComponent {
  meta: string = '';
  mostrarFormulario: boolean = false;

  constructor(private accountService: AccountService) {
    this.meta = this.accountService.obtenerMeta();
  }

  guardarMeta() {
    this.accountService.guardarMeta(this.meta);
    this.mostrarFormulario = false;
  }
}
