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
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './shared/material.module';
import { MaterialNavComponent } from './dashboard/material-nav/material-nav.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RealestateComponent } from './dashboard/realestate/realestate.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { MaterialTextFormInputComponent } from './forms/material-text-form-input/material-text-form-input.component';
import { AddRealEstateComponent } from './dashboard/realestate/add-realestate/add-realestate.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    MaterialNavComponent,
    AppComponent,
    NavComponent,
    RegisterComponent,
    TextFormInputComponent,
    DateFormInputComponent,
    MemberDetailComponent,
    HomeComponent,
    HomeLoginComponent,
    OptionsComponent,
    RealestateComponent,
    AddRealEstateComponent,
    MaterialTextFormInputComponent,

  ],
  entryComponents:[
    AddRealEstateComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot([
    ]),
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
