import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {
  model: any ={}
  password: string;
  loggedIn: boolean
  @Input() translatedFrom : string
  constructor(private router: Router, private translateService: TranslateService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.translateService.get('user.password').subscribe((data:any)=> {
      this.password = data
     });
  }
  gotToPage(page:string){
    this.router.navigate([page])
  }

  
login(){
  console.log(this.model)
  this.accountService.login(this.model).subscribe(response=>{
    console.log(response)
    this.loggedIn = true;
  }, error =>{
    console.log(error)
  })
}
}
