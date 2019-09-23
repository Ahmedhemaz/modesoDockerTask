import {EventEmitter, Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { UserModel } from './models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    if (AuthService.isAuthenticated()) {
      this.currentUser = UserService.getUserDataFromLocalStorage();
      this.authenticated = true;
    }
  }
  formErrorStatus = new EventEmitter<boolean>();
  logOutEmitter = new EventEmitter<boolean>();
  currentUser: UserModel = null;
  authenticated: Boolean = false;
  private Authorization_Type = 'Bearer ';

  static extractDataFromResponseToUserObject(userObject: UserModel, userData: any) {
    userObject.id = userData.data.user.id;
    userObject.email = userData.data.user.email;
    userObject.fullName = userData.data.user.fullName;
    userObject.userName = userData.data.user.userName;
    userObject.token = userData.data.token;
  }

  static saveUserDataToLocalStorage(userObject: UserModel) {
    localStorage.setItem('user', JSON.stringify(userObject));
  }
  static isAuthenticated() {
    return (JSON.parse(localStorage.getItem('user')) != null );
  }

  signIn(user: UserModel) {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
    return this.http.post('http://localhost:3000/api/v1/users/login',
      user, {headers})
      .pipe(
        map((response: Response) => response)
      );
  }

  signUp(user: UserModel) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/api/v1/users', user, {headers})
      .pipe(
        map((response: Response) =>  response)
      );
  }

  logOut() {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.Authorization_Type + UserService.getTokenFromLocalStorage()
    });
    return this.http.post('http://localhost:3000/api/v1/users/logout', this.currentUser, {headers})
      .pipe(
        map((response: Response) =>  response)
      );
  }

  hideFormError(formErrorFlag: boolean) {
    this.formErrorStatus.emit(formErrorFlag);
  }

  onNavigate(user: UserModel) {
    (AuthService.isAuthenticated()) ?
      this.router.navigate(['users', user.id, 'notes']) :
      this.router.getCurrentNavigation();
  }

  onLogOut() {
    this.logOut();
    this.currentUser = null;
    this.logOutEmitter.emit(false);
    localStorage.clear();
    this.router.navigate(['']);

  }


}
