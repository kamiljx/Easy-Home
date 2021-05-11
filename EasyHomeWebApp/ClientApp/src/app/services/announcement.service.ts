import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls } from 'src/api';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseUrl = ApiUrls.baseUrl
  realEstateId;
  constructor(private http: HttpClient,) { }


  
  
  addRealEstateAnnouncement(model:any){
    return this.http.post(ApiUrls.baseUrl + 'annoucement/create', model)
  }
  getRealEstateAnnouncement(){
    let params = new HttpParams().set('realEstateId', this.realEstateId)
    return this.http.get<Announcement[]>(this.baseUrl + 'announcement/id',{params: params});
    console.log(this.realEstateId)
  }
}