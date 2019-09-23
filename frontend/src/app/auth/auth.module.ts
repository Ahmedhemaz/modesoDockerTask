import {NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthRoutingModule} from './auth-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../components/shared/shared.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AuthModule {

}
