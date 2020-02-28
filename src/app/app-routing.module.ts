import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './_components/login-page/login-page.component';
import {MainComponent} from './_components/main/main.component';

import {SignUpPageComponent} from './_components/sign-up-page/sign-up-page.component';
import {HomePageComponent} from './_components/home-page/home-page.component';
import {CourseDetailsComponent} from './_components/course-details/course-details.component';
import {LoggedInGuard} from './_guard/logged-in.guard';
import {PageNotFoundComponent} from './_components/page-not-found/page-not-found.component';
import {LivePageComponent} from './_components/live-page/live-page.component';


const routes: Routes = [

    {
        path: '', component: MainComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'course', component: MainComponent,
        children: [
            {
                path: '', redirectTo: '/', pathMatch: 'full'
            },
            {
                path: ':course-slug',
                component: CourseDetailsComponent
            }
        ]
    },
    {path: 'live/:channel', component: LivePageComponent},
    {path: 'login', component: LoginPageComponent, canActivate: [LoggedInGuard]},
    {path: 'register', component: SignUpPageComponent, canActivate: [LoggedInGuard]},

    {
        path: '**', component: MainComponent,
        children: [
            {path: '', component: PageNotFoundComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
