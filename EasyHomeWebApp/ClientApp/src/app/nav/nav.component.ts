import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  lang: string;
  constructor() { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang' || 'pl')
  }
  changeLang(lang){
    localStorage.setItem('lang', lang);
    window.location.reload();
    console.log(lang)
  }
}
