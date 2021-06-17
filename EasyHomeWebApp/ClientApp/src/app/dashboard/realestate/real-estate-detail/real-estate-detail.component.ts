import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { RealestateService } from 'src/app/services/realestate.service';
import { OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddRealestateDetailAnnouncementComponent } from './add-realestate-detail-announcement/add-realestate-detail-announcement.component';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

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
  validationErrors: string[] =[];
  specificRealEstate;
  label = 'danger';
  emptyArray: [];
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Announcement[];
  announcementsArr: Announcement[]


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private realestateService: RealestateService,
     private dialog: MatDialog, private announcementService: AnnouncementService, private toastr: ToastrService) { }

  ngOnInit(): void { 
    this.realEstateId = this.activatedRoute.snapshot.params['id']
    this.specificRealEstate = this.realestateService.specificRealEstate
    this.announcementService.realEstateId = this.realEstateId;
    this.getAllAnnouncements()
    console.log(typeof this.realEstateId)

  }
  addAnnouncement(){
    const dialogRef = this.dialog.open(AddRealestateDetailAnnouncementComponent, {
      width: '50%',
      data: this.realEstateId
    });

    dialogRef.afterClosed().subscribe(result => {
      autoFocus: false
    });}
  
  getAllAnnouncements(){
   this.announcementService.getRealEstateAnnouncement()
      .subscribe(announcement =>{
      this.announcementsArr = announcement
   })
  }
  deleteAnnouncement(id){
    this.announcementService.deleteRealEstateAnnouncement(id).subscribe( response =>{
      this.toastr.success('Usunięto')
    }, error =>{
      this.validationErrors = error;
      this.toastr.error(error.error)
     })
  }

 
}
