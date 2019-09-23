import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserModel } from '../models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [UserModel]
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  logInError: Boolean;
  constructor(private fb: FormBuilder, private authService: AuthService, private user: UserModel, private router: Router) {
      this.authService.formErrorStatus.subscribe(value => this.logInError = false);
      this.authService.logOutEmitter.subscribe(value => this.authService.authenticated = value);
      this.authService.logInEmitter.subscribe(value => this.authService.authenticated = value);
  }


  ngOnInit() {
    (!this.authService.authenticated) ? this.router.getCurrentNavigation() : this.router.navigate(['']);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  onSubmit() {
    this.fillUserObjectWithLoginFormData();
    this.authService.signIn(this.user)
      .subscribe(
        (userData: any) => {
          AuthService.extractDataFromResponseToUserObject(this.user, userData);
          AuthService.saveUserDataToLocalStorage(this.user);
          this.authService.currentUser = UserService.getUserDataFromLocalStorage();
          this.authService.logInEmitter.emit(true);
          this.authService.onNavigate(this.user);
        },
        error => this.logInError = true
      );
  }



  fillUserObjectWithLoginFormData() {
     this.user.email = this.loginForm.value.email;
     this.user.password = this.loginForm.value.password;
  }
}
