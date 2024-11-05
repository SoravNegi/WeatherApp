import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  // fb = inject(FbService);
  // router = inject(Router);

  // errorMessage?: string;

  // signup(e: Event) {
  //   if (
  //     e.target instanceof HTMLFormElement &&
  //     'email' in e.target &&
  //     'password' in e.target &&
  //     e.target['email'] instanceof HTMLInputElement &&
  //     e.target['password'] instanceof HTMLInputElement
  //   ) {
  //     this.fb
  //       .signup(e.target['email'].value, e.target['password'].value)
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

  signupForm: FormGroup;
  errorMessage?: string;
  ui = inject(UiService);

  // // Sample local user data
  // private users = [
  //   { email: 'user@example.com', password: 'password123' },
  //   // Add more users as needed
  // ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signup() {
    const { email, password } = this.signupForm.value;
    console.log(
      'signup form->',
      this.signupForm.value,
      ' - ',
      email,
      ' - ',
      password
    );
    const checkUser = this.ui.signup(email, password);
    console.log('check user->', checkUser);
    if (checkUser) {
      this.router.navigateByUrl('/login');
      this.toastr.success('Successfully Signed In');
    } else {
      this.toastr.error('Invalid email or password.');
    }
  }

  // signup() {
  //   if (this.signupForm.valid) {
  //     const { email, password } = this.signupForm.value;

  //     // Check if the user already exists
  //     const userExists = this.users.some((user) => user.email === email);

  //     if (userExists) {
  //       this.errorMessage = 'Email is already registered.';
  //       setTimeout(() => (this.errorMessage = ''), 2000);
  //     } else {
  //       // Simulate adding the new user
  //       this.users.push({ email, password });
  //       this.router.navigateByUrl(''); // Navigate to the main page after signup
  //     }
  //   }
  // }
}
