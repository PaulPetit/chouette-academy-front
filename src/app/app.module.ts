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
import {LivePageComponent} from './_components/live-page/live-page.component';
import {NavbarComponent} from './_components/narbar/navbar.component';
import {FooterComponent} from './_components/footer/footer.component';
import {ChatComponent} from './_components/chat/chat.component';
import {ChatMessageComponent} from './_components/chat-message/chat-message.component';
import { UserReviewComponent } from './_components/user-review/user-review.component';
import { CategoriesPageComponent } from './_components/categories-page/categories-page.component';
import { PrivateUserPageComponent } from './_components/private-user-page/private-user-page.component';
import { CourseEditPageComponent } from './_components/course-edit-page/course-edit-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateCAPipe } from './date-ca.pipe';
import { SearchPageComponent } from './_components/search-page/search-page.component';



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
        TestComponent,
        LivePageComponent,
        NavbarComponent,
        FooterComponent,
        ChatComponent,
        ChatMessageComponent,
        UserReviewComponent,
        CategoriesPageComponent,
        PrivateUserPageComponent,
        CourseEditPageComponent,
        DateCAPipe,
        SearchPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
