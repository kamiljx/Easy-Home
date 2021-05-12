import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { RealestateService } from 'src/app/services/realestate.service';
import { OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddRealestateDetailAnnouncementComponent } from './add-realestate-detail-announcement/add-realestate-detail-announcement.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-real-estate-detail',
  templateUrl: './real-estate-detail.component.html',
  styleUrls: ['./real-estate-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class RealEstateDetailComponent implements OnInit {
  realEstateId: number;
  specificRealEstate: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private realestateService: RealestateService, private dialog: MatDialog ) { }

  ngOnInit(): void { 
    this.realEstateId = this.activatedRoute.snapshot.params['id']
    console.log(this.realEstateId)
    this.specificRealEstate = this.realestateService.specificRealEstate
    console.log(this.specificRealEstate)
  }
  addAnnouncement(){
    const dialogRef = this.dialog.open(AddRealestateDetailAnnouncementComponent, {
      width: '50%',
      data: this.realEstateId
    });

    dialogRef.afterClosed().subscribe(result => {
      autoFocus: false
    });}
  
  }
