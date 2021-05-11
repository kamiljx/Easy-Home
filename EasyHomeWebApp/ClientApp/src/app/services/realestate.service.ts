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
  specificRealEstate: any;
  constructor(private http: HttpClient, private accountService: AccountService) { }
  currentUser = this.accountService.getCurrentUser()

  getRealestate(){
    let params = new HttpParams().set('Name', this.currentUser)
     return this.http.get<Realestate[]>(this.baseUrl + 'realestate/name',{params: params});
  }

  addRealEstate(model:any){
    return this.http.post(ApiUrls.baseUrl + 'realestate/create', model)
  }

  addRentierToRealestate(model:any){
     return this.http.post(ApiUrls.baseUrl + 'realestate/addrentier', model)
  }

}
