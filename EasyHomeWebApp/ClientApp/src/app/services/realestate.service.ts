import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from 'src/api';
import { Realestate } from '../models/realestate';

@Injectable({
  providedIn: 'root'
})
export class RealestateService {
  baseUrl = ApiUrls.baseUrl
  constructor(private http: HttpClient) { }

  getRealestate(){
    // return this.http.get<Realestate[]>(this.baseUrl + 'TODO');
    return this.http.get(this.baseUrl + 'TODO');
  }
}
