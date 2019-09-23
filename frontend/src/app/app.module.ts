import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import {NoteModule} from './note/note.module';
import {NoteService} from './note/note-service';
import {NoteResolverService} from './note/note-resolver.service';
import {UserResolverService} from './user/user-resolver.service';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpInterceptorService } from './http.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    AuthModule,
    UserModule,
    NoteModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    AuthService,
    AuthGuard,
    UserService,
    NoteService,
    NoteResolverService,
    UserResolverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
