import { Component } from '@angular/core';
import { WalletAPIService } from '../wallet-api.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})

export class TransaccionesComponent {
  tipoTransaccion: string = 'INGRESO';

  montoIngreso: number=0;
  descripcionIngreso: string="";
  cuentaIngreso: string="";

  montoGasto: number=0;
  descripcionGasto: string="";
  categoriaGasto: string="";
  cuentaGasto: string="";

  constructor(private walletService: WalletAPIService) {}

  onTipoTransaccionChange(tipo: string): void {
    this.tipoTransaccion = tipo;
  }

  realizarIngreso(): void {
    const ingresoData = {
      monto: this.montoIngreso,
      descripcion: this.descripcionIngreso,
      cuenta: this.cuentaIngreso
    };

    this.walletService.sumarBalance("idWallet", ingresoData).subscribe(
      (respuesta) => {
        console.log('Balance sumado con éxito', respuesta);
        // Realiza acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al sumar el balance', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }

  realizarGasto(): void {
    const gastoData = {
      monto: this.montoGasto,
      descripcion: this.descripcionGasto,
      categoria: this.categoriaGasto,
      cuenta: this.cuentaGasto
    };

    this.walletService.restarBalance("idWallet", gastoData).subscribe(
      (respuesta) => {
        console.log('Balance restado con éxito', respuesta);
        // Realiza acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al restar el balance', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }
}
