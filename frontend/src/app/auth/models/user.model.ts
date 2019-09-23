import { Injectable } from "@angular/core";

@Injectable()
export class UserModel {
   id:number;
   email:string;
   password:string;
   fullName:string;
   userName:string;
   token:string;
}
