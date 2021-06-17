import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Realestate } from '../models/realestate';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { realEstateUser } from '../models/realEstateUser';



@Injectable({
  providedIn: 'root'
})
export class RealestateService {
  baseUrl = environment.apiUrl
  specificRealEstate: any;
  currentUser = this.accountService.getCurrentUser()
  constructor(private http: HttpClient, private accountService: AccountService) { }

  getRealestate(){
    let params = new HttpParams().set('name', this.currentUser)
     return this.http.get<Realestate[]>(this.baseUrl + 'realestate/owner',{params: params});
  }
  getRentierRealestate(){
    console.log(this.currentUser)
    let params = new HttpParams().set('name', this.currentUser)
     return this.http.get<Realestate[]>(this.baseUrl + 'realestate/rentier',{params: params});
  }

  addRealEstate(model:any){
    return this.http.post(this.baseUrl + 'realestate/create', model)
  }

  addRentierToRealestate(model:any){
    console.log(model)
     return this.http.post(this.baseUrl + 'realestate/addrentier', model)
  }
  getRentiers(realEstateId){
    return this.http.get<realEstateUser[]>(this.baseUrl + 'realestate/rentiers/' + realEstateId )
  }
}
