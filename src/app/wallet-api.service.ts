import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WalletAPIService {

  constructor(private http: HttpClient) {}

  getDatos() {
    return this.http.get('https://ejemplo.com/api/datos');
  }

  // Método para enviar datos a la API (POST)
  enviarDatos(datos: any) {
    return this.http.post('https://ejemplo.com/api/enviar', datos);
  }
}
