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
  constructor(private http: HttpClient, private accountService: AccountService) { }

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    let currentUser$ = this.accountService.getCurrentUser()
    return getPaginatedResult<Message[]>(this.baseUrl + 'message/' + currentUser$ , params, this.http);
  }
}
