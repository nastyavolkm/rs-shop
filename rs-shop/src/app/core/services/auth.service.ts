import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IToken } from '../models/IToken.model';
import { IUnLoggedUser } from '../models/IUnLoggedUser.model';
import { IUser } from '../models/IUser.model';

const USERS = 'users';

const CURRENT_USER = 'currentUser';

const UNLOGGED_USER = 'unLoggedUser';

@Injectable()
export class AuthService {
  isLoginFormShown$$ = new BehaviorSubject(false);

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationShown$$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  showLoginForm(): void {
    this.isLoginFormShown$$.next(true);
  }

  hideLoginForm(): void {
    this.isLoginFormShown$$.next(false);
  }

  showRegistration(): void {
    this.isRegistrationShown$$.next(true);
  }

  hideRegistration(): void {
    this.isRegistrationShown$$.next(false);
  }

  registerUser(form: NgForm): Observable<IToken> {
    const body = form.value;
    return this.http
      .post<IToken>(`${USERS}/register`, body)
      .pipe(catchError(this.handleLoginError));
  }

  loginUser(form: NgForm): Observable<IToken> {
    const body = form.value;
    return this.http.post<IToken>(`${USERS}/login`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 0) {
          errorMessage = error.error;
        } else {
          errorMessage = error.error;
        }
        this.areCredentialsInvalid$$.next(true);
        return throwError(errorMessage);
      }),
    );
  }

  getUserInfo(token: IToken): Observable<IUser> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token.token}` });

    return this.http.get<IUser>(`${USERS}/userInfo`, { headers });
  }

  saveUser(user: IUser): void {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  }

  getCurrentUser(): Observable<IUser | undefined> {
    const currentUser = localStorage.getItem(CURRENT_USER);
    if (typeof currentUser === 'string') {
      return of(JSON.parse(currentUser));
    }
    return of(undefined);
  }

  saveUnLoggedUser(unLoggedUser: IUnLoggedUser): void {
    localStorage.setItem(UNLOGGED_USER, JSON.stringify(unLoggedUser));
  }

  getUnLoggedUser(): Observable<IUnLoggedUser | undefined> {
    const currentUser = localStorage.getItem(UNLOGGED_USER);
    if (typeof currentUser === 'string') {
      return of(JSON.parse(currentUser));
    }
    return of(undefined);
  }

  deleteUser(): void {
    localStorage.removeItem(CURRENT_USER);
  }

  handleLoginError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      errorMessage = error.error;
    } else {
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }
}
