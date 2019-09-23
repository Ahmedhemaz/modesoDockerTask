import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../auth/models/user.model";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserModel]
})
export class UserInfoComponent implements OnInit {

  constructor(private userService:UserService, private user:UserModel) { }

  ngOnInit() {
    this.userService.fetchUserInfo()
      .subscribe(
        (userData:any)=> {
          this.user.email = userData.data.email;
          this.user.fullName = userData.data.fullName;
          this.user.userName = userData.data.userName;
        },
        error => console.log(error)

      )
  }

}
