import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RealestateService } from 'src/app/services/realestate.service';
import { ThemeService } from 'src/app/services/theme.service';
import { RealestateComponent } from '../realestate.component';

@Component({
  selector: 'app-assign-rentier-to-realestate',
  templateUrl: './assign-rentier-to-realestate.component.html',
  styleUrls: ['./assign-rentier-to-realestate.component.css']
})
export class AssignRentierToRealestateComponent implements OnInit {
  validationErrors: string[] =[];
  storedTheme: string
  storedDarkTheme: boolean
  assignRentierToRealestate: FormGroup
  realEstateId: number;


  constructor(private themeService: ThemeService, private fb: FormBuilder, 
    private realestateService: RealestateService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<RealestateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.realEstateId = data
  }

  ngOnInit(): void {
    this.storedDarkTheme = this.themeService.darkThemeValue;
    this.storedTheme = this.themeService.storedTheme;
    this.initializeForm()
  }

  initializeForm(){
    this.assignRentierToRealestate = this.fb.group({
      realEstateId: [this.realEstateId.valueOf()],
      userName: ['',[Validators.required, Validators.email]],
    }
    )
  }
  returnId(){
    return this.realEstateId
  }
  addRentierToEstate(){
    this.realestateService.addRentierToRealestate(this.assignRentierToRealestate.value).subscribe(
      respone =>{
        this.toastr.success('dodano')
      },error =>{
        this.validationErrors = error
        this.toastr.error(error.error)
      }
    )
}
}
