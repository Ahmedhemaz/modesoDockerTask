import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../auth/models/user.model";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
  providers: [UserModel]
})
export class UserEditFormComponent implements OnInit {

  editForm:FormGroup;
  editErrorMessage:string;
  editError:boolean;
  constructor(private fb:FormBuilder, private user:UserModel, private userService:UserService,
              private activatedRoute:ActivatedRoute, private router:Router) {
    this.userService.formErrorStatus.subscribe(value => this.editError =false);

  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe(
        (user:any)=>{
          this.user = user.user.data;
        }
      );
    this.editForm = this.fb.group({
      fullName:[this.user.fullName,[Validators.minLength(5)]],
      email: [this.user.email, [Validators.email]],
      password: ["",[Validators.minLength(8),Validators.maxLength(20)]],
      userName: [this.user.userName,[Validators.minLength(5)]]
    });
  }

  onSubmit(){
    this.fillUserObjectWithRegistrationFormData();
    this.userService.editUser(this.user)
      .subscribe(
        (userData:any)=>{
          console.log(userData);
          UserService.extractDataFromResponseToUserObject(this.user,userData);
          UserService.saveUserDataToLocalStorage(this.user);
          this.router.navigate(['/users','me'])
        },
        error => {
          console.log(error)
          this.editErrorMessage = error.error.message;
          this.editError = true;
        }
      );
  }

  fillUserObjectWithRegistrationFormData(){
    this.user.email = this.editForm.value.email;
    this.user.password = this.editForm.value.password;
    this.user.userName = this.editForm.value.userName;
    this.user.fullName = this.editForm.value.fullName;
  }
}
