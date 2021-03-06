import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }


  addRealEstatePayment(model:any){
    console.log(model)
    return this.http.post(this.baseUrl + 'payments/addpayment', model)
  }
}
