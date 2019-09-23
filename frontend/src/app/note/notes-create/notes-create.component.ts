import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteService} from '../note-service';
import {NoteModel} from '../models/note.model';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss'],
  providers: [NoteModel]
})
export class NotesCreateComponent implements OnInit {

  // todo custom extension validation, route to /me/notes
  noteForm: FormGroup;
  noteErrorMessage: string;
  noteError: boolean;
  constructor(private  fb: FormBuilder, private noteService: NoteService,
              private note: NoteModel, private router: Router, private authService: AuthService) {
    this.noteService.formErrorStatus.subscribe(value => this.noteError = false);

  }

  ngOnInit() {
    this.noteForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(5)]],
      content: [null, [Validators.required, Validators.minLength(25), Validators.maxLength(255)]],
      image: [null, Validators.required],
      public: ['Select Note Privacy']
    });
  }

  onSubmit() {
    this.fillNoteObjectWithNoteFormData();
    this.noteService.createNote(this.note)
      .subscribe(
        (noteData: any) => {
          this.router.navigate(['/users', this.authService.currentUser.id, 'notes']);
        },
        error => {
          console.log(error);
        });

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
