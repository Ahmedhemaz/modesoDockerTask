import {NgModule} from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import {InputFieldComponent} from './input-field/input-field.component';

import {ReactiveFormsModule} from '@angular/forms';
import { NoteCardComponent } from './note-card/note-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InputFieldComponent,
    NoteCardComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    CommonModule,
  ],
  exports: [
    InputFieldComponent,
    NoteCardComponent
  ]
})
export class SharedModule {

}
