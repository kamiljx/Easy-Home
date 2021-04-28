import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RealestateService } from 'src/app/services/realestate.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-add-realestate',
  templateUrl: './add-realestate.component.html',
  styleUrls: ['./add-realestate.component.css']
})
export class AddRealEstateComponent implements OnInit {
  validationErrors: string[] =[];
  storedTheme: string
  storedDarkTheme: boolean
  addRealEstateForm: FormGroup;

  constructor(private themeService: ThemeService,  private fb: FormBuilder,
     private realestateService: RealestateService, private toastr: ToastrService, private accountService: AccountService) { }
  ngOnInit(): void {
    this.storedDarkTheme = this.themeService.darkThemeValue;
    this.storedTheme = this.themeService.storedTheme;
    this.initializeForm()
    this.getEmail()
    this.getName()
  }

  initializeForm(){
    this.addRealEstateForm = this.fb.group({
      ownerName: [this.accountService.getCurrentUser()],
      name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      city: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
      address: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(95)]],
      country: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
    })
  }
  matcher = new ErrorStateMatcher()

  getEmail(){
    return this.addRealEstateForm.get('email')
}
  getName(){
    return this.addRealEstateForm.get('name')
}

  addRealEstate(){
    console.log(this.addRealEstateForm)
    this.realestateService.addRealEstate(this.addRealEstateForm.value).subscribe(
      response =>{
       this.toastr.success('Dodano')
    }, error =>{
      this.validationErrors = error;
      this.toastr.error(error.error)
    })
}
}