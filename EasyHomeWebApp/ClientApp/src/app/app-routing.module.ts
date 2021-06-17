import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './home-login/register/register.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { AuthGuard } from './guard/auth.guard';
import { MaterialNavComponent } from './dashboard/material-nav/material-nav.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { RealestateComponent } from './dashboard/realestate/realestate.component';
import { RealEstateDetailComponent } from './dashboard/realestate/real-estate-detail/real-estate-detail.component';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { MemberMessagesComponent } from './member/member-messages/member-messages.component';



const routes: Routes = [
  //{path: '', component: AppComponent},
  {path: 'dashboard', component: MaterialNavComponent,canActivate: [AuthGuard],
    children:[
    {path: 'realestate', component: RealestateComponent},
    {path: 'realestate/details/:id',component: RealEstateDetailComponent},
    {path: 'settings', component: OptionsComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'add-real-estate', component: RealestateComponent},
    {path: 'members/:username', component: MemberDetailComponent},
    {path: 'members', component: MemberDetailComponent , canActivate: [AuthGuard]}, 
    {path: 'member-message', component: MemberMessagesComponent , canActivate: [AuthGuard]}, 

]},
  {path: 'nav', component: NavComponent},
  {path: 'login', component: HomeLoginComponent },
  {path: 'register', component: RegisterComponent},
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
