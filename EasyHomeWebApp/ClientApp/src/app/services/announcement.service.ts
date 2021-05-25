import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls } from 'src/api';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseUrl = ApiUrls.baseUrl
  realEstateId;
  constructor(private http: HttpClient,) { }


  
  
  addRealEstateAnnouncement(model:any){
    return this.http.post(ApiUrls.baseUrl + 'announcement/create', model)
  }
  getRealEstateAnnouncement(){
    let params = new HttpParams().set('estateId', this.realEstateId)
    //  this.http.get<Announcement[]>(this.baseUrl + 'announcement/getall',{params: params}).subscribe(announcement =>{
    //    this.announcements = announcement.
    //  });
    // console.log(this.realEstateId)
    return this.http.get<Announcement[]>(this.baseUrl + 'announcement/getall',{params: params});
  }

  testSl():Observable<Announcement>{
    let params = new HttpParams().set('estateId', this.realEstateId)
    return this.http.get<Announcement>(this.baseUrl + 'announcement/getall',{params: params});
  }
}