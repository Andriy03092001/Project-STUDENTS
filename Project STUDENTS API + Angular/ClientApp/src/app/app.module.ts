import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { SingUpComponent } from './Auth/sign-up/sign-up.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: { horizontal: { position: 'right' }, vertical: { position: 'top' } }
};


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    Page404Component,
    SignInComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    AppRoutingModule,
    NotifierModule.withConfig(customNotifierOptions),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    NgxSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
