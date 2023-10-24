import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { AppComponent } from './app.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: '', component: InicioComponent }, // Ruta principal (Inicio)
  { path: 'calendario', component: CalendarioComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: 'transacciones', component: TransaccionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
