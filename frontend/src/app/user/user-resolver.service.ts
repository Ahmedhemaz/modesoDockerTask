import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Injectable()
export class UserResolverService implements Resolve<any>{

  constructor(private userService:UserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.userService.fetchUserInfo();
  }

}
