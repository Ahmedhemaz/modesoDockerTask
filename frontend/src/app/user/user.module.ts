import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {UserInfoComponent} from "./user-info/user-info.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserNotesComponent } from './user-notes/user-notes.component';
import { NgxPaginationModule } from "ngx-pagination";
import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';
import {SharedModule} from "../components/shared/shared.module";

@NgModule({
  declarations: [
    UserInfoComponent,
    UserNotesComponent,
    UserEditFormComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule {

}
