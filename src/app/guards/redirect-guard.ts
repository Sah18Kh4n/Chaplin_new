import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRoles = this._authService.getRoles();
    if (userRoles.includes(environment.roles.moderator)) {
      this._router.navigate(['/app/master']);
      return false;
    } else if (userRoles.includes(environment.roles.user)) {
      this._router.navigate(['/app/player']);
      return false;
    }
    this._router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;

    // return this._authService.getUser().pipe(
    //   map((user: User) => {
    //     const userRoles = user.roles;
    //     if (userRoles.includes(environment.roles.moderator)) {
    //       this._router.navigate(['/app/master']);
    //       return false;
    //     } else if (userRoles.includes(environment.roles.user)) {
    //       this._router.navigate(['/app/player']);
    //       return false;
    //     }
    //     this._router.navigate(['/auth/login'], {
    //       queryParams: { returnUrl: state.url },
    //     });
    //     return false;
    //   })
    // );
  }
}
