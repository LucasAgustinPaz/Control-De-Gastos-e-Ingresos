import { Component } from '@angular/core';
import { WalletAPIService } from '../wallet-api.service';
import { AccountService } from '../accounts.service';
import { CalendarioService } from '../calendario.service';
import { TransaccionesService } from '../transacciones.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})

export class TransaccionesComponent {
  selectedAccount: string = '';
  availableBalance: number = 0;
  accounts: { id: string,name: string, balance: number, currency: string, active: boolean }[] = [];
  totalBalance: number = 0; // Agregamos una propiedad para el total
  tipoTransaccion: string = 'INGRESO';

  montoIngreso: number=0;
  descripcionIngreso: string="";
  cuentaIngreso: string="";

  montoGasto: number=0;
  descripcionGasto: string="";
  categoriaGasto: string="";
  cuentaGasto: string="";

  constructor(private walletService: WalletAPIService,  private accountService: AccountService, private calendarioService: CalendarioService,  private transaccionesService: TransaccionesService) {}

  ngOnInit(): void {
    this.accountService.walletArray$.subscribe(
      (walletArray: any[]) => {
        this.accounts = walletArray;
        console.log("cuentas llegaron transacciones", this.accounts);
        // Realiza acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al recibir actualizaciones del array de billeteras:', error);
      }
    );
  }

  realizarIngreso(): void {
    const selectedAccount = this.getSelectedAccount();
  
    if (!selectedAccount) {
      console.error('No se ha seleccionado una cuenta.');
      return;
    }

    const ingresoData = {
      monto: this.montoIngreso,
      descripcion: this.descripcionIngreso,
      cuenta: this.cuentaIngreso
    };

    const ingresoEvent = {
      title: 'Ingreso en cuenta: ' + ingresoData.cuenta,
      amount:"$" + ingresoData.monto,
      date: new Date(),
      description: ingresoData.descripcion,

    };
    const id = selectedAccount.id;
    this.accountService.sumarBalance(id, ingresoData.monto);
    this.calendarioService.addEvent(ingresoEvent);
    this.transaccionesService.agregarTransaccion(ingresoEvent);
  }

  realizarGasto(): void {
    const selectedAccount = this.getSelectedAccount();
  
    if (!selectedAccount) {
      console.error('No se ha seleccionado una cuenta.');
      return;
    }
  
    const gastoData = {
      monto: this.montoGasto,
      descripcion: this.descripcionGasto,
      categoria: this.categoriaGasto,
      cuenta: this.cuentaGasto
    };

    const gastoEvent = {
      title: 'Gasto en cuenta: ' + gastoData.cuenta,
      amount: "$" + (gastoData.monto*-1),
      date: new Date(),
      description: gastoData.descripcion,
      categoria: gastoData.categoria,
    };
    const id = selectedAccount.id;
  
    this.accountService.restarBalance(id,  gastoData.monto);
    this.calendarioService.addEvent(gastoEvent);
    this.transaccionesService.agregarTransaccion(gastoEvent); 
  }

  onAccountChange() {
    const selectedAccount = this.getSelectedAccount();
    if (selectedAccount) {
      this.availableBalance = selectedAccount.balance;
    }
  }
  
  getSelectedAccount(): { id:string, name: string, balance: number, active: boolean } | undefined {
    return this.accounts.find(account => account.name === this.selectedAccount);
  }
}
