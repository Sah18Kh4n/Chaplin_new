import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { environment } from './../../environments/environment';

// Setup headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser = new BehaviorSubject<User>(null);
  public userEmitter = this.currentUser.asObservable();

  private readonly apiUrl = environment.apiUrl;
  private registerUrl = this.apiUrl + '/register';
  private loginUrl = this.apiUrl + '/login';
  private readonly tokenString = 'chaplin_token';
  private readonly userDataString = 'chaplin_user';
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(user: User): Observable<any> {
    const request = JSON.stringify(user);

    return this.http.post(this.registerUrl, request, httpOptions).pipe(
      map((response: User) => {
        // Receive jwt token in the response
        const token: string = response[this.tokenKey];
        // If we have a token, proceed
        if (token) {
          this.setToken(token);
          // this.setActiveUser(response);
          this.getUser().subscribe();
        }
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  onLogin(user: User): Observable<User> {
    const request = JSON.stringify({
      email: user.email,
      password: user.password,
    });

    return this.http.post(this.loginUrl, request, httpOptions).pipe(
      tap((response: User) => {
        // Receive jwt token in the response
        const token: string = response[this.tokenKey];
        // If we have a token, proceed
        if (token) {
          this.setToken(token);
          // this.setActiveUser(response);
          // this.getUser().subscribe();
        }
        return response;
      }),
      // .tap((results) => this.setActiveUser(data))
      switchMap(() => this.getUser()),
      tap((user: User) => user),
      catchError((error) => this.handleError(error))
    );
  }

  onLogout(): Observable<any> {
    // return this.http.post<any>(this.apiUrl + '/auth/logout', httpOptions).pipe(
    //   tap(
    //     () => {
    //       localStorage.removeItem(this.tokenString);
    //       this.userEmitChange(null);
    //       this.router.navigate(['/']);
    //     }
    //   )
    // );
    localStorage.removeItem(this.tokenString);
    localStorage.removeItem(this.userDataString);
    this.userEmitChange(null);
    this.router.navigate(['/']);

    return EMPTY;
  }

  setToken(token: string): void {
    return localStorage.setItem(this.tokenString, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenString);
  }

  getUser(): Observable<User> {
    if (!this.getToken()) {
      return null;
    }
    return this.http.get(this.apiUrl + '/getuser').pipe(
      tap((user: any) => {
        // this.currentUser = user;
        // TO BE REMOVED
        // user.roles = ['ROLE_MODERATOR', 'ROLE_USER'];
        this.userEmitChange({
          ...user.user,
          roles: ['ROLE_MODERATOR', 'ROLE_USER'],
        });

        return user;
      })
    );
    // const user = JSON.parse(localStorage.getItem(this.userDataString));
    // this.userEmitChange(user);
    // return user;
  }

  getRoles(): string[] {
    const userString = localStorage.getItem(this.userDataString);
    if (!userString) {
      return [];
    }
    const user: User = JSON.parse(localStorage.getItem(this.userDataString));
    if (!user) {
      return [];
    }
    return user.roles;
  }

  setActiveUser(user: User): void {
    // this.userEmitChange(user);
    return localStorage.setItem(this.userDataString, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    // get the token
    const token: string | null = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  private userEmitChange(usr: User) {
    console.log('00000', usr);
    this.setActiveUser(usr);
    this.currentUser.next(usr);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side error.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend error.
      return throwError(error);
    }
    // return a custom error message
    return throwError(
      'Ohps something wrong happen here; please try again later.'
    );
  }
}
