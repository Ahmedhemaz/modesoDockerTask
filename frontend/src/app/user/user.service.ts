import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../auth/models/user.model';
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

  static extractDataFromResponseToUserObject(userObject: UserModel, userData: any) {
    userObject.id = userData.data.user.id;
    userObject.email = userData.data.user.email;
    userObject.fullName = userData.data.user.fullName;
    userObject.userName = userData.data.user.userName;
    userObject.token = userData.data.user.jwt;
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
    return this.http.get('http://localhost:3000/api/v1/users/me');
  }

  fetchUserNotesWithId(userId: number) {
    return this.http.get(`http://localhost:3000/api/v1/users/${userId}/notes`);
  }

  editUser(userObject: UserModel) {
    return this.http.put('http://localhost:3000/api/v1/users/edit', userObject);
  }
  hideFormError(formErrorFlag: boolean) {
    this.formErrorStatus.emit(formErrorFlag);
  }
}
