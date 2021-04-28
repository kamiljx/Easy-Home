import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls } from 'src/api';
import { Realestate } from '../models/realestate';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RealestateService {
  baseUrl = ApiUrls.baseUrl
  constructor(private http: HttpClient, private accountService: AccountService) { }
  currentUser = this.accountService.getCurrentUser()

  getRealestate(){
    let params = new HttpParams().set('ownerName', this.currentUser)
     return this.http.get<Realestate[]>(this.baseUrl + 'realestate/name',{params: params});
    // return this.http.get(this.baseUrl + 'TODO');
  }

  addRealEstate(model:any){
    return this.http.post(ApiUrls.baseUrl + 'realestate/create', model)
  }


  // .pipe(
  //   map((realestate: Realestate) => {
  //     if()
  //   })
  // )


  // register(model:any){
  //   return this.http.post(ApiUrls.baseUrl + 'account/register', model).pipe(
  //     map((user: User) => {
  //       if (user){
  //         localStorage.setItem('user', JSON.stringify(user));
  //         this.currentUserSource.next(user)
  //       }
  //     })
  //   )
  // }
}
