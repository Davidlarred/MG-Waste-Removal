import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: 'Login',
    loadComponent: () =>
      import('./Components/log-in/log-in.component').then(
        (c) => c.LogInComponent
      ),
    title: 'Login',
    data: { animation: 'login' },
  },
  {
    path: 'Register',
    loadComponent: () =>
      import('./Components/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    title: 'Register',
    data: { animation: 'register' },
  },
  {
    path: 'AccountVerification',
    loadComponent: () =>
      import('./Components/confirm/confirm.component').then(
        (c) => c.ConfirmComponent
      ),
    title: 'Confirm Email',
    data: { animation: 'confirm email' }
  },
];
