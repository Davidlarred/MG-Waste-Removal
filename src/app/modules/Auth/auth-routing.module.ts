import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./Components/log-in/log-in.component').then((c) => c.LogInComponent),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () => import('./Components/register/register.component').then((c) => c.RegisterComponent),
    title: 'Register',
  },
];