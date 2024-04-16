import { EventEmitter, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, switchMap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()
export class AuthService {

  private authStatusListener = new BehaviorSubject<boolean>(this.isLogged);
  private localApi = environment.localApi;
  http = inject(HttpClient);
  constructor(private router: Router) {}
  get isLogged(): boolean {
    return !!this.accessToken;
  }

  get accessToken(): string | null {
    return localStorage.getItem('token');
  }

  signIn(credentials: any) {
    return this.http.post(`${this.localApi}/user/userLogin`, credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        localStorage.setItem('token', response.token);
        // console.log(localStorage.getItem('token'));
        if (this.accessToken) {
          localStorage.setItem('user', this.decodeUser().user);
        }
        this.authStatusListener.next(true);
        // Return a new observable with the response
        return of(response);
      })
    );
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['']);
    this.authStatusListener.next(false);
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  userRegister(userRegisterForm: any): Observable<any> {
    return this.http.post(`${this.localApi}/user/addUser`, userRegisterForm);
  }

  sendNewPass(data: any): Observable<any> {
    return this.http.post(`${this.localApi}/user/setPasswordUser`, data);
  }

  confirmRegistration(confirmationToken: any): Observable<any> {
    return this.http.post(`${this.localApi}/user/confirmRegistration`, {
      confirmation_token: confirmationToken,
    });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.localApi}/user/recoveryPasswordMailUser`, {
      email,
    });
  }

  decodeUser() {
    const DECODED_TOKEN = helper.decodeToken(localStorage.getItem('token'));
    return DECODED_TOKEN;
  }
}


