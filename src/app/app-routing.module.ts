import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NuevaCuentaComponent } from './nueva-cuenta/nueva-cuenta.component';
import { LoginOscuroComponent } from './inicio-oscuro/login-oscuro.component';
import { MetaFinancieraComponent } from './meta-financiera/meta-financiera.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegisterComponent },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendario',
    component: CalendarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'analisis',
    component: AnalisisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nuevaCuenta',
    component: NuevaCuentaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inicioOscuro',
    component: LoginOscuroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'metaFinanciera',
    component: MetaFinancieraComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
