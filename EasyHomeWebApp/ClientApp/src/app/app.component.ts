import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService, private accountService: AccountService){
    this.translateService.setDefaultLang('pl');
    this.translateService.use(localStorage.getItem('lang') || 'pl');
  }
  ngOnInit() {
  this.setCurrentUser()
  }
 
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user)
  }
  
}
