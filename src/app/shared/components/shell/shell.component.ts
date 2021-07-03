import { Component, OnInit } from '@angular/core';
import { AuthServiceFake } from '../../../core/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  currentUser: any;

  constructor(
    public authServiceFake: AuthServiceFake,
    private tokenStorage: TokenStorageService,
    public router: Router,

    ) {}

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    console.log('shell currentUser ===>',this.currentUser)
  }

  logout(): void {
    console.log('logout')
    this.tokenStorage.signOut();
    this.router.navigate(['/home']);
    window.location.reload();

  }

}