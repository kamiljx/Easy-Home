import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Input() loggedIn: boolean
  token: string;
  userName: string;
  userRole: string;
  baseUrl = environment.apiUrl
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  helper = new JwtHelperService();
  constructor(private http: HttpClient, private presence: PresenceService ) { }
  
  register(model:any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
          this.presence.createHubConnection(user);
        }
      })
      )
    }
    login(model:any){
      return this.http.post(this.baseUrl + 'account/login', model).pipe(
        map((response: any) => {
          const user = response;
          if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.presence.createHubConnection(user);
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
  getDecodedToken(token) {
    console.log( JSON.parse(atob(token.split('.')[1])))

    return JSON.parse(atob(token.split('.')[1]));
  }
  setCurrentUser(user: User){
    user.role = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.role = roles : user.role.push(roles);
    this.userRole = roles
    this.currentUserSource.next(user)
  }
  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
    this.presence.stopHubConnection()
  }

  isOwner(){
    console.log()
  }
}
