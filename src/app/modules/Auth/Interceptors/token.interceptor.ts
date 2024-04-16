import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // let httpClient = inject(HttpClient);
  let router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      const isExpired =
        decodedToken && decodedToken.exp
          ? decodedToken.exp < Date.now() / 1000
          : false;

      if (isExpired) {
        //   console.log('Token expired');
        //   httpClient
        //     .post('http://localhost:3000/refreshToken', {})
        //     .subscribe((newToken: any) => {
        //       localStorage.setItem('token', newToken);
        //       req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
        //     });
        //   return next(req);
        console.log('Token expired');
        localStorage.removeItem('token');
        router.navigateByUrl('/login');
      } else {
        console.log('Token not expired');
      }
    } catch (e) {
      console.log('Invalid token');
      localStorage.removeItem('token');
      router.navigateByUrl('/login');
    }
  } else {
    console.log('No token');
    router.navigateByUrl('/login');
  }

  return next(req);
};
