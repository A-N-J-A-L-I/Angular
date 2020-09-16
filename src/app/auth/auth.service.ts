import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // public getToken(): string {
  //   return localStorage.getItem('AccessToken');
  //   // this._cookieService.get('backendAccessToken');
  // }
  //
  // public setToken(accessToken: String): void {
  //   localStorage.setItem('AccessToken', accessToken.toString());
  //   // this._cookieService.set('backendAccessToken', accessToken.toString());
  // }
}
