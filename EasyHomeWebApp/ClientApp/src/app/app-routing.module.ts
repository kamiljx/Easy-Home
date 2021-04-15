import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './home-login/register/register.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  //{path: '', component: AppComponent},
  {path: 'nav', component: NavComponent},
  {path: 'login', component: HomeLoginComponent },
  {path: 'register', component: RegisterComponent},
  // {
  //   path: '',
  //   runGuardsAndResolvers: "always",
  //   canActivate: [AuthGuard],
  //   children: [
    
    //   ]
    // },
    {path: 'members/:id', component: MemberDetailComponent},
    {path: 'members', component: MemberDetailComponent , canActivate: [AuthGuard]}, 
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
