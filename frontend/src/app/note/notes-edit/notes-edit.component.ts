import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteService} from '../note-service';
import {NoteModel} from '../models/note.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.scss'],
  providers: [NoteModel]

})
export class NotesEditComponent implements OnInit {

  noteForm: FormGroup;
  noteErrorMessage: string;
  noteError: boolean;
  constructor(private  fb: FormBuilder, private noteService: NoteService, private note: NoteModel,
              private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.noteService.formErrorStatus.subscribe(value => this.noteError = false);
  }
  ngOnInit() {
    this.activatedRoute.data
      .subscribe(
        (data: any) => {
          this.note = data.note.data.note;
        }
      );
    console.log(this.note);
    this.noteForm = this.fb.group({
      title: [this.note.title, [Validators.minLength(5)]],
      content: [this.note.content, [ Validators.minLength(25), Validators.maxLength(255)]],
      image: [null],
      public: [this.note.public]
    });
  }

  onSubmit() {
    this.fillNoteObjectWithNoteFormData();
    this.noteService.editNote(this.note)
      .subscribe(
        (noteData: any) => {
          this.router.navigate(['/users', this.authService.currentUser.id, 'notes']);
        },
        error => {
          console.log(error);
        }
      );

  }

  onFileChange(event) {
    this.note.image = event.target.files[0];
  }


  fillNoteObjectWithNoteFormData() {
    this.note.title = this.noteForm.value.title;
    this.note.content = this.noteForm.value.content;
    this.note.public = this.noteForm.value.public;
  }
}
