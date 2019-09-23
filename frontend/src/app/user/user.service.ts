import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../auth/models/user.model';
import {map} from 'rxjs/operators';
import {Response} from '@angular/http';
import {NoteService} from '../note/note-service';
import {NoteModel} from '../note/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private  http: HttpClient, public noteService: NoteService) {}
  formErrorStatus = new EventEmitter<boolean>();
  userNotesEmitter = new EventEmitter<NoteModel[]>();
  userNotesArray: any[] = [];

  private Authorization_Type = 'Bearer ';

  static extractDataFromResponseToUserObject(userObject: UserModel, userData: any) {
    userObject.id = userData.data.user.id;
    userObject.email = userData.data.user.email;
    userObject.fullName = userData.data.user.fullName;
    userObject.userName = userData.data.user.userName;
    userObject.token = userData.data.user.jwt;
    console.log(userObject);
  }

  static getUserDataFromLocalStorage() {
    return JSON.parse((localStorage.getItem('user')));
  }

  static saveUserDataToLocalStorage(userObject: UserModel) {
    localStorage.setItem('user', JSON.stringify(userObject));
  }
  static getTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user')).token;
  }
  fetchUserInfo() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: this.Authorization_Type + UserService.getTokenFromLocalStorage()
    });
    return this.http.get('http://localhost:3000/api/v1/users/me', {headers})
      .pipe(
        map((response: Response) => response)
      );
  }

  fetchUserNotesWithId(userId: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: this.Authorization_Type + UserService.getTokenFromLocalStorage()
    });
    return this.http.get(`http://localhost:3000/api/v1/users/${userId}/notes`, {headers})
      .pipe(
        map((response: Response) => response)
      );
  }

  editUser(userObject: UserModel) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.Authorization_Type + UserService.getTokenFromLocalStorage()
    });
    return this.http.put('http://localhost:3000/api/v1/users/edit', userObject, {headers})
      .pipe(
        map((response: Response) =>  response)
      );
  }
  hideFormError(formErrorFlag: boolean) {
    this.formErrorStatus.emit(formErrorFlag);
  }
}
