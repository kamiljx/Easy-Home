import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';
import { PresenceService } from './services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService, private accountService: AccountService, private router: Router,
    private presence: PresenceService){
    this.translateService.setDefaultLang('pl');
    this.translateService.use(localStorage.getItem('lang') || 'pl');
  }
  ngOnInit() {
  this.setCurrentUser()
  }
 
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user)
      this.presence.createHubConnection(user)
    }
  }
  
  hasRoute(route: string){
    return this.router.url.includes(route)
  }
}
