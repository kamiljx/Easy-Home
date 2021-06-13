import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { Message } from '../models/message';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginatorHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl
   currentUser$ = this.accountService.getCurrentUser()
  constructor(private http: HttpClient, private accountService: AccountService) { }

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'message/' + this.currentUser$ , params, this.http);
  }
  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'message/thread/' + this.currentUser$ +'/'+ username);
  }
  sendMessage(model: any){
    console.log(model)
    return this.http.post(this.baseUrl + 'message', model)
  }
}
