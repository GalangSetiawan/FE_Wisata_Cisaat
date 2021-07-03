import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceFake {
  isLoggedIn = false;

  constructor(private router: Router) {}

  login() {
    this.isLoggedIn = true;
    this.router.navigateByUrl('/');
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }
}
