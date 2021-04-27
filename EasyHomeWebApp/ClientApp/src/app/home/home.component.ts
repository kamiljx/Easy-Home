import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.hasDarkTheme()
    this.hasTheme()

  }
  
  hasDarkTheme(){
    let isDarkTheme =localStorage.getItem("isDarkTheme")
    if(isDarkTheme === null){
      localStorage.setItem("isDarkTheme", "true")
    }
  }
  hasTheme(){
    let hasTheme =localStorage.getItem("theme")
    if(hasTheme === null){
      localStorage.setItem("theme", "deeppurple-amber")
    }
  }
  gotToPage(page:string){
    this.router.navigate([page])
  }
  registerToggle(){
    this.registerMode = !this.registerMode
  }
  login(){}
}
