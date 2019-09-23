import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import {SharedModule} from '../components/shared/shared.module';
import {NotesCreateComponent} from './notes-create/notes-create.component';
import {NotesEditComponent} from './notes-edit/notes-edit.component';
import {NotesInfoComponent} from './notes-info/notes-info.component';
import {NoteRoutingModule} from './note-routing.module';

@NgModule({
  declarations: [
    NotesCreateComponent,
    NotesEditComponent,
    NotesInfoComponent
  ],
  imports: [
    NoteRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFontAwesomeModule,
  ]
})
export class NoteModule {

}
