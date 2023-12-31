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
    'X-RapidAPI-Key': 'b34bd0cdebmsh494fe88111798c1p1ed41ajsncabc0fd70a57',
    'X-RapidAPI-Host': 'wallet37.p.rapidapi.com',
  });

  constructor(private http: HttpClient) { }

  // Nuevo método para crear un usuario
  crearUsuario(usuarioData: any): Observable<any> {
    const url = 'https://wallet37.p.rapidapi.com/user/sign-up';

    return this.http.post(url, usuarioData, { headers: this.headers });
  }

  // Nuevo método para obtener datos del usuario por token
  getUserByToken(token: string): Observable<any> {
    const url = `https://wallet37.p.rapidapi.com/user/token/${token}`;

    return this.http.get(url, { headers: this.headers });
  }

  existeUser():string | null {
    return localStorage.getItem('authFlag');
  }

  isLoggedIn(): boolean {
    const authFlag = localStorage.getItem('authFlag');
    if(authFlag == '1'){
      return true;
    }else{
      return false;
    }
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('authFlag');
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

  // Nuevo método para actualizar el saldo de la billetera
  updateWallet(walletId: string, token: string, value: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/update-balance`;
    const params = new HttpParams()
      .set('walletId', walletId)
      .set('token', token)
      .set('value', value);

    return this.http.patch(url, data, { headers: this.headers, params });
  }

}
