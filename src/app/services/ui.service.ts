import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  darkModeState: BehaviorSubject<boolean>;
  loggedIn: BehaviorSubject<boolean>;
  public users: any[] = [];

  constructor() {
    // TODO: if the user is signed in get the default value from Firebase
    this.darkModeState = new BehaviorSubject<boolean>(false);
    this.loggedIn = new BehaviorSubject<boolean>(false);
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  login(email: string, password: string): boolean {
    // Check credentials
    return this.users.some(
      (user) => user.email === email && user.password === password
    );
  }

  signup(email: string, password: string): boolean {
    // Check if user already exists
    if (this.users.some((user) => user.email === email)) {
      return false; // User already exists
    }

    // Create a new user and store it
    this.users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(this.users));
    return true; // Successful signup
  }
}
