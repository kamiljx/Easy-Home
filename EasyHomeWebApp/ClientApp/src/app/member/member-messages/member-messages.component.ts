import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountService } from 'src/app/services/account.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  username: any;
  @Input() email: string;
  messageContent: string;
  message: FormGroup
  messages: Message[];
  validationErrors: string[] =[];


  constructor(public messageService: MessageService, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private accountService: AccountService,) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.loadMessages()
    this.initializeForm()

  }
  getUserId(){
    this.activatedRoute.paramMap.subscribe(param => {
      this.username = param.get('id');
    });
  }
  loadMessages(){
    this.messageService.getMessageThread(this.username).subscribe(messages =>{
      console.log(this.username)
      this.messages = messages;
    })
  }  
  initializeForm(){
    this.message = this.fb.group({
      senderUsername: this.accountService.getCurrentUser(),
      recipentUsername: this.username,
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3000)]],
      
    })
  }
  sendMessage(){
    this.messageService.sendMessage(this.message.value).subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
    console.log(this.message.value)

  }
  matcher = new ErrorStateMatcher()

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}