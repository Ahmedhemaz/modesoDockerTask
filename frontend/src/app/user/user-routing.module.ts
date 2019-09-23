import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserInfoComponent} from "./user-info/user-info.component";
import {AuthGuard} from "../auth/auth-guard.service";
import {UserNotesComponent} from "./user-notes/user-notes.component";
import {UserEditFormComponent} from "./user-edit-form/user-edit-form.component";
import {UserResolverService} from "./user-resolver.service";

const  userRoutes:Routes = [
  { path: 'users', canActivateChild:[AuthGuard],canActivate:[AuthGuard],
    children:[
      {path: '', component:UserInfoComponent, pathMatch: 'full'},
      { path: 'me',component:UserInfoComponent },
      { path: ':id/notes',component:UserNotesComponent},
      { path: 'me/edit', component:UserEditFormComponent, resolve:{user:UserResolverService} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]

})

export class UserRoutingModule {
}
