import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
// import { ConfirmService } from 'src/app/services/confirm.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  messageType:any = [
    { value: "Unread" , icon:"fa fa-envelope"},
    { value: "Inbox" , icon:"fa fa-envelope-open"},
    { value: "outbox", icon:"fa fa-paper-plane"}
  ]
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService, ) { }

  ngOnInit(): void {
    // this.loadMessages();
  }

  onContainerChange(value){
    console.log(this.container)
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, value).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }
   loadMessages() {
     this.loading = true;
     this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
       this.messages = response.result;
       this.pagination = response.pagination;
       this.loading = false;
     })
   }

  // deleteMessage(id: number) {
  //   this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result => {
  //     if (result) {
  //       this.messageService.deleteMessage(id).subscribe(() => {
  //         this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
  //       })
  //     }
  //   })

  // }
  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
