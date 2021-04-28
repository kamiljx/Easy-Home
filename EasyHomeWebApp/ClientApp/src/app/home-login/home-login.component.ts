import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {
  model: any ={}
  password: string;
  
  @Input() translatedFrom : string
  constructor(private router: Router, private translateService: TranslateService, private accountService: AccountService,
                private toastr: ToastrService) { }

  ngOnInit(): void {
    this.translateService.get('user.password').subscribe((data:any)=> {
      this.password = data
     });
     this.getCurrentUser()
 }
  gotToPage(page:string){
    this.router.navigate([page])
  }

  redirect(){
    setTimeout(() => {
      this.router.navigate(['/dashboard/realestate']);
  }, 1200);
  }
  
login(){
  this.accountService.login(this.model).subscribe(response=>{
    this.accountService.loggedIn = true;
    this.toastr.success("zalogowano")
    this.redirect()
  }, error =>{
    console.log(error)
    this.toastr.error(error.error)
  })
}
  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user =>{
      this.accountService.loggedIn = !!user;
    }, error =>{
      console.log(error)
    })
  }
}
