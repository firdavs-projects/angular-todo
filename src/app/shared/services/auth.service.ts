import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FbAuthResponse, User} from '../interfaces';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AlertService} from './alert.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private alert: AlertService,
              public afAuth: AngularFireAuth,
  ) {
  }

  get email(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-email');
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  private static setToken(res: FbAuthResponse | null): void {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-email', res.email);
    } else {
      localStorage.clear();
    }
  }

  private static handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        // @ts-ignore
        this.alert.openSnackBar('Неверный email', 'Скрыть');
        break;
      case 'INVALID_PASSWORD':
        // @ts-ignore
        this.alert.openSnackBar('Неверный пароль', 'Скрыть');
        break;
      case 'EMAIL_NOT_FOUND':
        // @ts-ignore
        this.alert.openSnackBar('Пользователь не найден', 'Скрыть');
        break;
      case 'EMAIL_EXISTS':
        // @ts-ignore
        this.alert.openSnackBar('Пользователь уже зарегистрирован', 'Скрыть');
        break;
    }
    return throwError(error);
  }

  signUp(email, password): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).catch(e => {
      console.log(e);
      return;
    });
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(AuthService.setToken),
        catchError(AuthService.handleError.bind(this))
      );
  }

  logout(): void {
    AuthService.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
