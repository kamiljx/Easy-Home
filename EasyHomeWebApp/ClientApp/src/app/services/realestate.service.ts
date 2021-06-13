import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls } from 'src/api';
import { Realestate } from '../models/realestate';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RealestateService {
  baseUrl = environment.apiUrl
  specificRealEstate: any;
  currentUser = this.accountService.getCurrentUser()
  constructor(private http: HttpClient, private accountService: AccountService) { }

  getRealestate(){
    let params = new HttpParams().set('Name', this.currentUser)
     return this.http.get<Realestate[]>(this.baseUrl + 'realestate/name',{params: params});
  }

  addRealEstate(model:any){
    return this.http.post(this.baseUrl + 'realestate/create', model)
  }

  addRentierToRealestate(model:any){
     return this.http.post(this.baseUrl + 'realestate/addrentier', model)
  }
  getRealestates(){
    let params = new HttpParams().set('Name', this.currentUser)
     console.log( this.http.get<Realestate[]>(this.baseUrl + 'realestate/name',{params: params}))
  }
}
