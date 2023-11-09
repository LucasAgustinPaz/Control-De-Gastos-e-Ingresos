import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'angular-calendar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CajaComponent } from './caja/caja.component';
import { Caja2Component } from './caja2/caja2.component';
import { TituloGeneralComponent } from './titulo-general/titulo-general.component';
import { DisponibleParaGastarComponent } from './disponible-para-gastar/disponible-para-gastar.component';
import { MenuDesplegableComponent } from './menu-desplegable/menu-desplegable.component';
import { BarraInferiorNavComponent } from './barra-inferior-nav/barra-inferior-nav.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CajaComponent,
    Caja2Component,
    TituloGeneralComponent,
    DisponibleParaGastarComponent,
    MenuDesplegableComponent,
    BarraInferiorNavComponent,
    CalendarioComponent,
    AnalisisComponent,
    TransaccionesComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
