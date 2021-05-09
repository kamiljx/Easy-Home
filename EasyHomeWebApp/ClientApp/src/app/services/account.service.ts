import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrls } from 'src/api';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Input() loggedIn: boolean
  token: string;
  userRole: string ="not asigned";
  userName: string;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  helper = new JwtHelperService();
  constructor(private http: HttpClient,  ) { }
  
  register(model:any){
    return this.http.post(ApiUrls.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
      )
    }
    login(model:any){
      return this.http.post(ApiUrls.baseUrl + 'account/login', model).pipe(
        map((response: any) => {
          const user = response;
          if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('user')).username;
  }
  getCurrentToken(){
    this.token = JSON.parse(localStorage.getItem('user')).token;
  }
  decodeToken(){
     const decodeToken = this.helper.decodeToken(this.token)
    //  this.currentUser$.role = decodeToken.role
     this.userRole = decodeToken.role
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user)
  }
  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
  }
}
