import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WalletAPIService {

  private apiUrl = 'https://wallet37.p.rapidapi.com/wallet';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '14a24bc25dmsh3c1d1ae71c1dab5p1077f7jsn0a6478e24c6f',
    'X-RapidAPI-Host': 'wallet37.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  getDatos() {
    return this.http.get('https://ejemplo.com/api/datos');
  }

  enviarDatos(datos: any): Observable<any> {
    return this.http.post('https://ejemplo.com/api/enviar', datos);
  }
  
  
  // Nuevo método para obtener datos del usuario por token
  getUserByToken(token: string): Observable<any> {
    const url = `https://wallet37.p.rapidapi.com/user/token/${token}`;

    return this.http.get(url, { headers: this.headers });
  }

   // Nuevo método para obtener datos del usuario por ID
   getUserByID(userId: string): Observable<any> {
    const url = `https://wallet37.p.rapidapi.com/user/${userId}`;

    return this.http.get(url, { headers: this.headers });
  }

  // Nuevo método para iniciar sesión
  iniciarSesion(email: string, password: string): Observable<any> {
    const url = 'https://wallet37.p.rapidapi.com/user/sign-in';
    const data = { email, password };

    return this.http.post(url, data, { headers: this.headers });
  }
  // Nuevo método para crear una wallet
  crearWallet(walletData: any): Observable<any> {
    return this.http.post(this.apiUrl, walletData, { headers: this.headers });
  }
  
  // Nuevo método para obtener el balance total del usuario
  getTotalUserBalance(userId: string): Observable<any> {
      const url = `https://wallet37.p.rapidapi.com/wallet/total-balance/${userId}`;
  
      return this.http.get(url, { headers: this.headers });
  }

  
  // Nuevo método para obtener las billeteras del usuario
  getUserWallets(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;

    return this.http.get(url, { headers: this.headers });
  }

   // Nuevo método para compartir una billetera
   shareWallet(walletId: string, userId: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/share-wallet`;
    const params = new HttpParams()
      .set('walletId', walletId)
      .set('userId', userId);

    return this.http.patch(url, data, { headers: this.headers, params });
  }

   // Nuevo método para actualizar el saldo de la billetera
   updateWallet(walletId: string, token: string, value: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/update-balance`;
    const params = new HttpParams()
      .set('walletId', walletId)
      .set('token', token)
      .set('value', value);

    return this.http.patch(url, data, { headers: this.headers, params });
  }
    // Nuevo método para sumar balance
    sumarBalance(walletId: string, balanceData: any): Observable<any> {
      const url = `${this.apiUrl}/${walletId}/plus-balance`;
  
      return this.http.patch(url, balanceData, { headers: this.headers });
    }
    
     // Nuevo método para restar balance
  restarBalance(walletId: string, balanceData: any): Observable<any> {
    const url = `${this.apiUrl}/${walletId}/minus-balance`;

    return this.http.patch(url, balanceData, { headers: this.headers });
  }

}
