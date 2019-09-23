import { Component, OnInit } from '@angular/core';
import {NoteModel} from '../models/note.model';
import { NoteService } from '../note-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-notes-info',
  templateUrl: './notes-info.component.html',
  styleUrls: ['./notes-info.component.scss'],
  providers: [ NoteModel ]
})
export class NotesInfoComponent implements OnInit {
  private note: NoteModel;
  private errorMessage: string;
  constructor(private  noteService: NoteService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.noteService.getNoteIdFromParams(this.activatedRoute);
    this.noteService.fetchNoteById(this.noteService.noteId)
      .subscribe(
        (note: any) => {
          this.note = note.data.note;
        },
        error => this.errorMessage = error.error.message
      );
  }

  onBackButton(event) {
    this.router.navigate(['/users', this.authService.currentUser.id, 'notes']);
  }

  onDelete(noteId: number) {
    this.noteService.deleteNote(noteId)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate(['/users', this.authService.currentUser.id, 'notes']);
        },
        error => console.log(error)
      );
  }
}
