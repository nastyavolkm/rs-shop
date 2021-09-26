import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserActions } from 'src/app/redux/actions/userActions';
import { UserSelectors } from 'src/app/redux/selectors/userSelectors';
import { IToken } from '../models/IToken.model';
import { IUnLoggedUser } from '../models/IUnLoggedUser.model';
import { IUser } from '../models/IUser.model';

const USERS = 'users';

// const CURRENT_USER = 'currentUser';

const UNLOGGED_USER = 'unLoggedUser';

@Injectable()
export class AuthService {
  isLoginFormShown$$ = new BehaviorSubject(false);

  areCredentialsInvalid$$ = new BehaviorSubject(false);

  isRegistrationShown$$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store) {}

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
    this.saveToken(token);
    return this.http.get<IUser>(`${USERS}/userInfo`, { headers });
  }

  saveToken(token: IToken): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getCurrentToken(): IToken | undefined {
    const currentToken = localStorage.getItem('token');
    if (typeof currentToken === 'string') {
      return JSON.parse(currentToken);
    }
    return undefined;
  }

  saveUnLoggedUser(unLoggedUser: IUnLoggedUser): void {
    localStorage.setItem(UNLOGGED_USER, JSON.stringify(unLoggedUser));
  }

  getUnLoggedUser(): IUnLoggedUser | undefined {
    const currentUser = localStorage.getItem(UNLOGGED_USER);
    if (typeof currentUser === 'string') {
      return JSON.parse(currentUser);
    } else return undefined;
  }

  deleteUnLoggedUser(): void {
    localStorage.removeItem(UNLOGGED_USER);
  }

  checkLogin(): Observable<IUser | IUnLoggedUser | undefined> {
    const token = this.getCurrentToken();
    let unLoggedUser = this.getUnLoggedUser();
    if (token === undefined) {
      if (unLoggedUser === undefined) {
        unLoggedUser = {
          firstName: 'unlogged',
          lastName: 'unlogged',
          cart: [],
          favorites: [],
        };
        this.saveUnLoggedUser(unLoggedUser);
      }
      return of(unLoggedUser);
    } else {
      this.store.dispatch(UserActions.getUser({ token: token }));
      return this.store.pipe(select(UserSelectors.user));
    }
  }

  checkUser(): void {
    if (this.getCurrentToken()) {
      this.store.dispatch(UserActions.getUser({ token: this.getCurrentToken()! }));
    }
  }

  isLogged(): Observable<boolean> {
    if (this.getCurrentToken()) {
      return of(true);
    } else {
      return of(false);
    }
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
