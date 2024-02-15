import { Route, provideRouter } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { authRoutes } from './modules/Auth/auth-routing.module';

export const routes: Route[] = [
  { path: '', component: MainComponent, title: 'Home' }, // Default route
  ...authRoutes, // Imported modular routes from the Auth module
  // You can import more routes from other modules in a similar fashion
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
