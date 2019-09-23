import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../user.service';
import {NoteModel} from '../../note/models/note.model';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {
  userId: number;
  notesArray: any[] = [];
  errorMessage: string;
  page: number;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.userService.userNotesEmitter.subscribe(
      (notesArray: NoteModel[]) => this.notesArray = notesArray
    );
  }


  ngOnInit() {
    this.page = 1;
    this.getUserIdFromParams();
  }

  getUserIdFromParams() {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.userId = + params.id;
          this.fetchNotesData();
        });
  }

  onDelete(noteId: number) {
    this.userService.noteService.deleteNote(noteId)
      .subscribe(
        () => {
          this.userService.userNotesEmitter.emit(
            this.notesArray.filter(note => note.id !== noteId)
          );
        }
      );
  }

  fetchNotesData() {
    this.userService.fetchUserNotesWithId(this.userId)
      .subscribe(
        (userNotes: any) => {
          if (userNotes != null) {
            userNotes.data.notes.forEach((note) => {
              this.notesArray.push(note);
            });
          } else {
            this.notesArray = [];
          }
          this.userService.userNotesEmitter.emit(this.notesArray);
        },
        error => this.errorMessage = error.error.message
      );
  }

  onReadMore(noteId: number) {
    this.router.navigate(['/note', noteId]);
  }

}
