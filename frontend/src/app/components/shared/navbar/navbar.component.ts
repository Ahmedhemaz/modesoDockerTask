import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.authService.logOutEmitter.subscribe(
      (value: boolean) => {
        this.authService.authenticated = value;
      }
    );
  }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.onLogOut();
  }



}
