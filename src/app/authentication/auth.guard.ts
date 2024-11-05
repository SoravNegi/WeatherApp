import { CanActivateFn, Router } from '@angular/router';
import { UiService } from '../services/ui.service';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, shareReplay, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const ui = inject(UiService);
  const router = inject(Router);
  // const loggedIn = ui.loggedIn.pipe(takeUntilDestroyed(), shareReplay(1));
  // console.log('loggedIn->', loggedIn);
  // if (loggedIn) {
  //   return true;
  // } else {
  //   router.navigateByUrl('/login');
  //   return false;
  // }
  // Subscribe to the BehaviorSubject to get the current value
  return true;
  return ui.loggedIn.pipe(
    take(1), // Take the first emitted value and complete
    map((loggedInValue) => {
      console.log('LoggedInValue->', loggedInValue);
      if (loggedInValue) {
        return true; // Allow access if logged in
      } else {
        router.navigate(['/login']); // Redirect to login if not authenticated
        return false; // Deny access
      }
    })
  );
};
