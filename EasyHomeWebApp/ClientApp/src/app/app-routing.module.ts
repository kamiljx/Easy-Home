import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './home-login/register/register.component';
import { HomeLoginComponent } from './home-login/home-login.component';

const routes: Routes = [
  //{path: '', component: AppComponent},
  {path: 'nav', component: NavComponent},
  {path: 'login', component: HomeLoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'members/:id', component: MemberDetailComponent},
  {path: '**', component: HomeComponent }
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
