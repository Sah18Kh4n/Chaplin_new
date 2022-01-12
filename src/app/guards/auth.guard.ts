import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.checkUserLogin(route, state);
    // return this._authService
    //   .getUser()
    //   .pipe(
    //     map((user: User) => {
    //       return true;
    //     }),
    //     catchError((err) => {
    //       console.log('error from the local authorization');
    //       this._router.navigate(['/auth/login'], {
    //         queryParams: { returnUrl: state.url },
    //       });
    //       return of(false);
    //     })
    //   );

    // return this._authService.getUser().pipe(
    //   map(e => {
    //     if (e) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }),
    //   catchError(() => {
    //     this._router.navigate(['/login']);
    //     return of(false);
    //   })
    // );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import('@angular/router').UrlTree
    | Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    return this.canActivate(childRoute, state);
  }

  checkUserLogin(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    // if (this._authService.isAuthenticated()) {
    //   // logged in so return true
    //   console.log('AUTHENTICATEDDD');   
    //   return true;
    // }

    // this._router.navigate(['/auth/login'], {
    //   queryParams: { returnUrl: state.url },
    // });
    // return false;
    
    if (this._authService.isAuthenticated()) {
      return this._authService.getUser().pipe(
        map((user: User) => {
          if (user) {
            return true;
          } else {
            this._router.navigate(['/auth/login'], {
              queryParams: { returnUrl: state.url },
            });
            return false;
          }
        }),
        catchError(() => {
          this._router.navigate(['/auth/login']);
          return of(false);
        })
      );
    } else {
      this._router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
