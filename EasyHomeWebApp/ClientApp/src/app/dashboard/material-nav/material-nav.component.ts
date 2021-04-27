import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
import { OptionsComponent } from '../options/options.component';

@Component({
  selector: 'app-material-nav',
  templateUrl: './material-nav.component.html',
  styleUrls: ['./material-nav.component.css']
})
export class MaterialNavComponent implements OnInit {
  storedTheme: string
  storedDarkTheme: boolean
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private translateService: TranslateService,
    private themeService: ThemeService) {

    }
    ngOnInit(): void {
      this.storedDarkTheme = this.themeService.darkThemeValue;
      this.storedTheme = this.themeService.storedTheme;
    }
  
    

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    // getThemeColor(){
    //    console.log(localStorage.getItem('theme'))
    //    return localStorage.getItem('theme')
    // }
}

