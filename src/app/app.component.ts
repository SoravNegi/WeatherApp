import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  ui = inject(UiService);
  // fb = inject(FbService);
  // router = inject(Router);

  // showMenu = false;
  // darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed(), shareReplay(1));
  // userEmail$ = this.fb.userEmail();
  // loggedIn = this.fb.isAuth();

  // toggleMenu() {
  //   this.showMenu = !this.showMenu;
  // }

  // modeToggleSwitch() {
  //   this.ui.darkModeState.next(!this.ui.darkModeState.value);
  // }

  // logout() {
  //   this.toggleMenu();
  //   this.router.navigateByUrl('/login');
  //   this.fb.signout();
  // }

  showMenu = false;
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed(), shareReplay(1));
  // loggedIn = false;
  // loggedIn$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.ui.loggedIn.pipe(takeUntilDestroyed(), shareReplay(1));
  // userEmail: string | null = 'user@example.com';
  userEmail: string | null = null;

  // Simulated local user data
  private users = [
    { email: 'user@example.com', password: 'password123' },
    // Add more users as needed
  ];

  constructor(private router: Router) {
    // Simulate user login
    // this.checkUserLogin();
  }

  toggleMenu() {
    if (this.loggedIn$) this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.ui.darkModeState.value);
  }

  // login(email: string, password: string) {
  //   const user = this.users.find(
  //     (u) => u.email === email && u.password === password
  //   );
  //   if (user) {
  //     this.loggedIn = true;
  //     this.userEmail = user.email;
  //     // Navigate to the main page or another route
  //     this.router.navigateByUrl('');
  //   } else {
  //     console.error('Invalid email or password');
  //     // Handle invalid login (e.g., show a message)
  //   }
  // }

  logout() {
    this.toggleMenu();
    // this.loggedIn$.next(false);
    this.ui.loggedIn.next(!this.ui.loggedIn.value);
    this.userEmail = null; // Clear the user email
    this.router.navigateByUrl('/login');
    // this.loggedIn = false;
  }

  // private checkUserLogin() {
  //   // const storedEmail = localStorage.getItem('loggedInUserEmail');

  //   // if (storedEmail) {
  //   //   const savedUser = this.users.find((u) => u.email === storedEmail);
  //   //   this.loggedIn = !!savedUser; // Set loggedIn to true if user exists
  //   //   this.userEmail = savedUser ? savedUser.email : null; // Store the user's email
  //   // } else {
  //   //   this.loggedIn = false; // No user is logged in
  //   //   this.userEmail = null; // Clear the user email
  //   // }
  //   // Simulate checking if a user is logged in
  //   const savedUser = this.users.find((u) => u.email === this.userEmail);
  //   // this.loggedIn = !!savedUser; // Set loggedIn based on existence
  //   // this.loggedIn$.next(!!savedUser);
  //   this.ui.loggedIn.next(!!savedUser);
  // }
}
