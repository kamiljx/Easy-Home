import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Input() loggedIn: boolean
  baseUrl="https://localhost:5001/api/"
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  register(model:any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
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
        }
      })
    )
  }
  setCurrentUser(user: User){
    this.currentUserSource.next(user)
  }
  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
  }
  // getRole(){
  //   let jwt = localStorage.getItem('user');
  //   let jwtData = jwt.split('.')[1];
  //   let decodeJwtJsonData = window.atob(jwtData);
  //   let decodeJwt = JSON.parse(decodeJwtJsonData)

  //   let isRentier = decodeJwt.rentier
  //   let isOwner = decodeJwt.owner

  //   console.log('Is rentier: ' + isRentier);
  //   console.log('Is owner: ' + isOwner);
  // }
}
