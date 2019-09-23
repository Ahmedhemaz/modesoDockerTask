import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import { UserModel } from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserModel]
})
export class SignUpComponent implements OnInit {

  // todo navigate to authenticated user homepage after registration
  registrationForm:FormGroup;
  registrationErrorMessage:string;
  registrationError:boolean;
  constructor(private fb:FormBuilder, private authService:AuthService, private user:UserModel, private router:Router) {
    this.authService.formErrorStatus.subscribe(value => this.registrationError =false);
    this.authService.logOutEmitter.subscribe(value => this.authService.authenticated = value);
  }

  ngOnInit() {
    (!this.authService.authenticated) ? this.router.getCurrentNavigation(): this.router.navigate(['']);
    this.registrationForm = this.fb.group({
      fullName:[null,[Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null,[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      userName: [null,[Validators.required,Validators.minLength(5)]]
    });
  }

  onSubmit(){
    this.fillUserObjectWithRegistrationFormData();
    this.authService.signUp(this.user)
      .subscribe(
        (userData:any)=>{
          AuthService.extractDataFromResponseToUserObject(this.user,userData);
          AuthService.saveUserDataToLocalStorage(this.user);
          this.authService.currentUser = UserService.getUserDataFromLocalStorage();
          this.authService.onNavigate(this.user);

        },
        error => {
          this.registrationErrorMessage = error.error.message;
          this.registrationError = true;
        }
      );
    this.authService.logOutEmitter.emit(true);
  }

  fillUserObjectWithRegistrationFormData(){
    this.user.email = this.registrationForm.value.email;
    this.user.password = this.registrationForm.value.password;
    this.user.userName = this.registrationForm.value.userName;
    this.user.fullName = this.registrationForm.value.fullName;
  }


}
