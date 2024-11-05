import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // fb = inject(FbService);
  // router = inject(Router);

  // errorMessage = '';

  // login(e: Event) {
  //   if (
  //     e.target instanceof HTMLFormElement &&
  //     'email' in e.target &&
  //     'password' in e.target &&
  //     e.target['email'] instanceof HTMLInputElement &&
  //     e.target['password'] instanceof HTMLInputElement
  //   ) {
  //     this.fb
  //       .signin(e.target['email'].value, e.target['password'].value)
  //       .pipe(first())
  //       .subscribe(
  //         () => {
  //           this.router.navigateByUrl('');
  //         },
  //         (err) => {
  //           this.errorMessage = err;
  //           setTimeout(() => (this.errorMessage = ''), 2000);
  //         }
  //       );
  //   }
  // }

  // // Simulated local user data
  // users = [
  //   { email: 'user@example.com', password: 'password123' },
  //   // Add more users as needed
  // ];

  // router = inject(Router);
  // errorMessage = '';

  // login(e: Event) {
  //   if (
  //     e.target instanceof HTMLFormElement &&
  //     'email' in e.target &&
  //     'password' in e.target &&
  //     e.target['email'] instanceof HTMLInputElement &&
  //     e.target['password'] instanceof HTMLInputElement
  //   ) {
  //     const email = e.target['email'].value;
  //     const password = e.target['password'].value;

  //     // Simulated sign-in logic
  //     const user = this.users.find(
  //       (u) => u.email === email && u.password === password
  //     );

  //     if (user) {
  //       // Navigate to the main page on successful login
  //       this.router.navigateByUrl('');
  //     } else {
  //       // Set error message on failed login
  //       this.errorMessage = 'Invalid email or password.';
  //       setTimeout(() => (this.errorMessage = ''), 2000);
  //     }
  //   }
  // }

  loginForm: FormGroup;
  errorMessage?: string;

  // // Simulated local user data
  // private users = [
  //   { email: 'user@example.com', password: 'password123' },
  //   // Add more users as needed
  // ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ui = inject(UiService);
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed(), shareReplay(1));
  loggedIn$ = this.ui.loggedIn.pipe(takeUntilDestroyed(), shareReplay(1));

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.ui.darkModeState.value);
  }

  login() {
    const { email, password } = this.loginForm.value;
    console.log(
      'login form->',
      this.loginForm.value,
      ' - ',
      email,
      ' - ',
      password
    );
    const checkUser = this.ui.login(email, password);
    console.log('check user->', checkUser);
    if (checkUser) {
      this.ui.loggedIn.next(!!checkUser);
      this.router.navigateByUrl('');
      this.toastr.success('Successfully Logged In');
    } else {
      this.toastr.error('Invalid email or password.');
    }
    // if (this.loginForm.valid) {
    //   const { email, password } = this.loginForm.value;

    //   // Simulated sign-in logic
    //   const user = this.users.find(
    //     (u) => u.email === email && u.password === password
    //   );

    //   if (user) {
    //     // Navigate to the main page on successful login
    //     this.router.navigateByUrl('');
    //   } else {
    //     // Set error message on failed login
    //     this.errorMessage = 'Invalid email or password.';
    //     setTimeout(() => (this.errorMessage = ''), 2000);
    //   }
    // }
  }
}
