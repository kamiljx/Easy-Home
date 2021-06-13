import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  currentUser = this.accountService.getCurrentUser()
  onProfile: string;
  member: Member;
  memberAge;
  constructor(private memberService: MembersService, private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadMember()
    this.onProfile = this.route.snapshot.params['username']

  }
  loadMember(){
    let memberEmail =  this.accountService.getCurrentUser()
    this.memberService.getMember(memberEmail).subscribe(member => {
      this.member = member
    })
  }
  isMyProfile(){
    return this.currentUser !== this.onProfile
    }
  

}
