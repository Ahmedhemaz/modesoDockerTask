import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NoteModel} from './models/note.model';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {Response} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteId: number;
  formErrorStatus = new EventEmitter<boolean>();
  private Authorization_Type = 'Bearer ';
  constructor(private http: HttpClient) {}

  createNote(note: NoteModel) {
    return this.http.post(
      'http://localhost:3000/api/v1/notes',
      this.createFormData(note),
      {headers: this.createAuthorizationHeader()})
      .pipe(
        map((response: Response) => response)
      );
  }

  fetchNoteById(noteId: number) {
    return this.http.get(`http://localhost:3000/api/v1/notes/${noteId}`
      // {headers: this.createAuthorizationHeader()}
      );
      // .pipe(
      //   map((response: Response) => response)
      // );
  }

  editNote(note: NoteModel) {
    return this.http.put(
      `http://localhost:3000/api/v1/notes/${note.id}`,
      this.createFormData(note),
      {headers: this.createAuthorizationHeader()})
      .pipe(
        map((response: Response) => response)
      );
  }

  deleteNote(noteId: number) {
    return this.http.delete(
      `http://localhost:3000/api/v1/notes/${noteId}`,
      {headers: this.createAuthorizationHeader()}
      )
      .pipe(
        map((response: Response) => response)
      );
  }

  // create form data of any object and if the value if file will append formData for file
  private createFormData(dataObject: any) {
    const formData = new FormData();
    Object.entries(dataObject).forEach(([key, value]) => {
      if (value == null) {
        return;
      }
      (value instanceof File) ?
        formData.append(key.toString(), value, value.name) :
        formData.append(key.toString(), value.toString());
    });
    return formData;
  }

  createAuthorizationHeader() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: this.Authorization_Type + this.getTokenFromLocalStorage()
    });
    return headers;
  }

  getTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user')).token;
  }

  getNoteIdFromParams(router: ActivatedRoute) {
    this.noteId = router.snapshot.params.id;
    router.params.subscribe(
      (params: Params) => {
        this.noteId = +params.id;
      }
    );
  }

  hideFormError(formErrorFlag: boolean) {
    this.formErrorStatus.emit(formErrorFlag);
  }
}
