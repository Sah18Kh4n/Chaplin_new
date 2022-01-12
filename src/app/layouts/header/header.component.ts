import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../../services/authentication.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User = null;
  userType: string = '';

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    private _location: Location
  ) {
    this.subscribeUser();
  }

  ngOnInit(): void {}

  subscribeUser() {
    this.auth.userEmitter.subscribe((user: User) => {
      console.log('header', user);
      this.currentUser = user;
      if (this.router.url.includes('master')) {
        this.userType = 'Game Master';
      }
      if (this.router.url.includes('player')) {
        this.userType = 'Player';
      }
    });
  }

  onLogout() {
    this.auth.onLogout().subscribe();
  }

  goBack() {
    this._location.back();
  }
  
  gotToHome() {
    if (this.userType === 'Player') {
      this.router.navigate(['/app/player']);
    }

    if (this.userType === 'Game Master') {
      this.router.navigate(['/app/master']);
    }
  }
}
