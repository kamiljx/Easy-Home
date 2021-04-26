import { HostBinding } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  storedDarkTheme: string = localStorage.getItem('isDarkTheme')
  darkThemeValue = this.storedDarkTheme.toLowerCase() == 'true';
  themeDark:boolean = this.darkThemeValue;
  activeTheme: string;
  theme:any =[
    {value: 'deeppurple-amber', viewValue: 'Deeppurple Amber'},
    {value: 'purple-green', viewValue: 'Purple Green'},
    {value: 'indigo-pink', viewValue: 'Indigo Pink'},
    {value: 'pink-bluegrey', viewValue: 'Pink Blue Grey'},
  ]
  
  constructor() { 
    
  }
  @HostBinding('class') 
  storedTheme: string = localStorage.getItem('theme');




  isDarkTheme(){
    localStorage.removeItem('isDarkTheme')
    let changed = this.themeDark = !this.themeDark
    localStorage.setItem("isDarkTheme", changed? "true" : "false")
    location.reload()
    console.log(changed)
    return changed
  }

  setThemeColor(event){
    this.activeTheme = event;
    localStorage.setItem('theme', event)
    localStorage.getItem('theme')
    location.reload()
  }
  
}


