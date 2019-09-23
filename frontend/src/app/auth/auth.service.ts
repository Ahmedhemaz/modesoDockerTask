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
  logInEmitter = new EventEmitter<boolean>();
  currentUser: UserModel = null;
  authenticated = false;

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
    return localStorage.getItem('user') === null ? false : true  ;
  }

  signIn(user: UserModel) {
    return this.http.post('http://localhost:3000/api/v1/users/login', user);
  }

  signUp(user: UserModel) {
    return this.http.post('http://localhost:3000/api/v1/users', user);
  }

  logOut() {
    return this.http.post('http://localhost:3000/api/v1/users/logout', this.currentUser);
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
