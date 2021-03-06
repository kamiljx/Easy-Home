import { Component, OnInit } from '@angular/core';
import { HomeLoginComponent } from '../home-login/home-login.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  lang: string;
  loggedIn: boolean
  email: string;
  constructor(public accountService : AccountService) { }

  ngOnInit(): void {
    this.email = this.accountService.getCurrentUser()
   this.loggedIn = this.accountService.loggedIn
    this.lang = localStorage.getItem('lang' || 'pl')
  }
  changeLang(lang){
    localStorage.setItem('lang', lang);
    window.location.reload();
    console.log(lang)
  }
  logout(){
    this.loggedIn = false;
    this.accountService.logout()
  }
}
