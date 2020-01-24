import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './_components/login-page/login-page.component';
import { MainComponent } from './_components/main/main.component';

import { SignUpPageComponent } from './_components/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './_components/home-page/home-page.component';


const routes: Routes = [
  {path: "login", component: LoginPageComponent},
  {path: "sign-up", component: SignUpPageComponent},
  {path: '', component: MainComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full'
      }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
