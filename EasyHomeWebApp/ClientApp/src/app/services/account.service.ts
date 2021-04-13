import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl="https://localhost:5001/api/"
  private currentUserSource = new ReplaySubject<User>(1);
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
    return this.http.post(this.baseUrl + 'account/login', model)
  }
}
