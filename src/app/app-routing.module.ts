import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NuevaCuentaComponent } from './nueva-cuenta/nueva-cuenta.component';




const routes: Routes = [
  { path: '', component: LoginComponent }, // volver a borrar
  { path: 'registrarse', component: RegisterComponent },
  { path: 'inicio', component: InicioComponent },  // volver a poner inicio
  { path: 'calendario', component: CalendarioComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'nuevaCuenta', component: NuevaCuentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
