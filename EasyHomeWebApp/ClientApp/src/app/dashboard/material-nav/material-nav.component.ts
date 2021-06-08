import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
import { OptionsComponent } from '../options/options.component';
import { AccountService } from 'src/app/services/account.service';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-material-nav',
  templateUrl: './material-nav.component.html',
  styleUrls: ['./material-nav.component.css']
})
export class MaterialNavComponent implements OnInit {
  @Input() loggedIn: boolean;
  member: string;
  storedTheme: string
  storedDarkTheme: boolean
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private translateService: TranslateService,
    private themeService: ThemeService, private accountService: AccountService, private memberService: MembersService) {

    }
    ngOnInit(): void {
      this.storedDarkTheme = this.themeService.darkThemeValue;
      this.storedTheme = this.themeService.storedTheme;
      this.loadMember()
    }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    logout(){
      this.loggedIn = false;
      this.accountService.logout()
      window.location.reload()
    }
    loadMember(){
      this.member = this.accountService.getCurrentUser()
    }
}

