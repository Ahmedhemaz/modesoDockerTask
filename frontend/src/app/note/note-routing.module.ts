import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard.service';
import {NotesInfoComponent} from './notes-info/notes-info.component';
import {NotesEditComponent} from './notes-edit/notes-edit.component';
import {NotesCreateComponent} from './notes-create/notes-create.component';
import {NoteResolverService} from './note-resolver.service';


const  noteRoutes: Routes = [
  { path: 'note', canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '',  component: NotesInfoComponent, pathMatch: 'full'},
      { path: 'create', component: NotesCreateComponent},
      { path: ':id', component: NotesInfoComponent },
      { path: ':id/edit', component: NotesEditComponent, resolve: {note: NoteResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(noteRoutes)],
  exports: [RouterModule]

})

export class NoteRoutingModule {
}
