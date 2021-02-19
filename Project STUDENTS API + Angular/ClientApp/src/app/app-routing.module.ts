import { SingUpComponent } from './Auth/sign-up/sign-up.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';




const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SingUpComponent, pathMatch: 'full' },
  // {
  //   path: 'sign-up',
  //   children: [
  //     { path: '', component: SingUpComponent, pathMatch: 'full' },
  //     { path: ':id', component: SingUpComponent, pathMatch: 'full' }
  //   ],
  //   canActivate: [NotLoginGuard]
  // },

  { path: '*', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
