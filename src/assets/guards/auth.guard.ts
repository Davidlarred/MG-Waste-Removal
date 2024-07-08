import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../app/modules/Auth/Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    take(1),
    map((user) => {
      if (!user) {
        // User is not logged in, redirect to login page
        router.navigate(['/Login']); // Adjust the login route as necessary
        return false;
      }
      if (!user.emailVerified) {
        // User is not verified, redirect to verification page
        router.navigate(['/AccountVerification']); // Adjust the verification route as necessary
        return false;
      }
      return true; // User is logged in and verified
    })
  );
};
