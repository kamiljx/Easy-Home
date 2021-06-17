import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls } from 'src/api';
import { Injectable } from '@angular/core';
import { Announcement } from '../models/announcement';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseUrl = environment.apiUrl
  realEstateId;
  constructor(private http: HttpClient,) { }


  
  
  addRealEstateAnnouncement(model:any){
    return this.http.post(this.baseUrl + 'announcement/create', model)
  }
  getRealEstateAnnouncement(){
    let params = new HttpParams().set('estateId', this.realEstateId)
    return this.http.get<Announcement[]>(this.baseUrl + 'announcement/getall',{params: params});
  }

  deleteRealEstateAnnouncement(id){
    let params = new HttpParams().set('annaucementId', id)
    return this.http.delete(this.baseUrl + 'announcement/delete', {params: params})

  }
}