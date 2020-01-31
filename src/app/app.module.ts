import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './_components/login-page/login-page.component';
import {MainComponent} from './_components/main/main.component';

import {SignUpPageComponent} from './_components/sign-up-page/sign-up-page.component';
import {HomePageComponent} from './_components/home-page/home-page.component';
import {CourseCardComponent} from './_components/course-card/course-card.component';
import {CourseDetailsComponent} from './_components/course-details/course-details.component';

import {PageNotFoundComponent} from './_components/page-not-found/page-not-found.component';
import {ToastGroupComponent} from './_components/toast-group/toast-group.component';
import {ToastComponent} from './_components/toast/toast.component';
import {TestComponent} from './_components/test/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainComponent,
    SignUpPageComponent,
    HomePageComponent,
    CourseCardComponent,
    CourseDetailsComponent,
    PageNotFoundComponent,
    ToastGroupComponent,
    ToastComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
