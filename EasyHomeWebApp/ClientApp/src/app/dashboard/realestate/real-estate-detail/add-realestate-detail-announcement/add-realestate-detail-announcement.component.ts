import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-realestate-detail-announcement',
  templateUrl: './add-realestate-detail-announcement.component.html',
  styleUrls: ['./add-realestate-detail-announcement.component.css']
})
export class AddRealestateDetailAnnouncementComponent implements OnInit {
  storedTheme: string
  validationErrors: string[] =[];
  storedDarkTheme: boolean
  addNewAnnouncement: FormGroup;
  realEstateId;
  selectedLabel;
  announcementLabel: any  [] = [
    {value: 'default'},
    {value: 'warning'},
    {value: 'success'},
    {value: 'info'},
    {value: 'primary'},
    {value: 'danger'},
  ]

  constructor(private themeService: ThemeService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, 
    @Inject(MAT_DIALOG_DATA) public data: any, private announcementService: AnnouncementService, private toastr: ToastrService) { 
      this.realEstateId = this.data
    }

  ngOnInit(): void {
    this.storedDarkTheme = this.themeService.darkThemeValue;
    this.storedTheme = this.themeService.storedTheme;
    this.announcementService.realEstateId = this.realEstateId;
    console.log(this.data)
    this.initializeForm()


  }
   initializeForm(){
     this.addNewAnnouncement = this.fb.group({
      id: [this.parseRealEstateId()],
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      label: ['default', this.selectedLabel],
      date: [ '5/1/2008 8:30:52 AM']
     })
   }
   matcher = new ErrorStateMatcher()
   
   addRealEstateAnnouncement(){
      this.announcementService.addRealEstateAnnouncement(this.addNewAnnouncement.value).subscribe(
      response =>{
        this.toastr.success('Dodano')
   }, error =>{
     this.validationErrors = error;
     this.toastr.error(error.error)
    })
  }
  parseRealEstateId(){
    return parseInt(this.realEstateId)
  }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}