import { Route, RouterModule, provideRouter } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { authRoutes } from './modules/Auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from '../assets/shared/interceptor/spinnerinterceptor';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestPaymentComponent } from './modules/Billing/guest-payment/guest-payment.component';


export const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    title: 'Home',
    data: { animation: 'HomePage' },
  },
  {
    path: 'payment',
    component: GuestPaymentComponent,
    title: 'Payment',
    data: { animation: 'HomePage' },
  },
  // Ensure each route in authRoutes also has a unique animation state if necessary
  ...authRoutes,
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Setup routing
      HttpClientModule, // Setup HTTP client
      BrowserAnimationsModule,
    ),
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
}).catch((err) => console.error(err));
