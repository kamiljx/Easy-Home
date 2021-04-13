import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './home-login/register/register.component';
import { TextFormInputComponent } from './forms/text-form-input/text-form-input.component';
import { DateFormInputComponent } from './forms/date-form-input/date-form-input.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { HomeComponent } from './home/home.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    TextFormInputComponent,
    DateFormInputComponent,
    MemberDetailComponent,
    HomeComponent,
    HomeLoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
    ]),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
