import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './_components/login-page/login-page.component';
import { MainComponent } from './_components/main/main.component';

import { SignUpPageComponent } from './_components/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './_components/home-page/home-page.component';
import { CourseCardComponent } from './_components/course-card/course-card.component';
import { CourseDetailsComponent } from './_components/course-details/course-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainComponent,
    SignUpPageComponent,
    HomePageComponent,
    CourseCardComponent,
    CourseDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
