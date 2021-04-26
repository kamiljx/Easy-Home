import { Component, OnInit, Output, Pipe } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit{

  themeDark: boolean;
  themes: [] 
  constructor(private breakpointObserver: BreakpointObserver, private themeService: ThemeService) {
    this.themes = this.themeService.theme
  }

  ngOnInit(): void {
    this.themeDark = this.themeService.darkThemeValue
  }
  isDarkTheme(){
    this.themeDark = this.themeService.isDarkTheme()
  }  

  
  themeColor(event){
    return this.themeService.setThemeColor(event)
  }
}

