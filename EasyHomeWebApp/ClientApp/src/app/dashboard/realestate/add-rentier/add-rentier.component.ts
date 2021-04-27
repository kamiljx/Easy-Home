import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-add-rentier',
  templateUrl: './add-rentier.component.html',
  styleUrls: ['./add-rentier.component.css']
})
export class AddRentierComponent implements OnInit {
  storedTheme: string
  storedDarkTheme: boolean
  addRealEstateForm: FormGroup;

  constructor(private themeService: ThemeService, overlayContainer: OverlayContainer, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.storedDarkTheme = this.themeService.darkThemeValue;
    this.storedTheme = this.themeService.storedTheme;
    this.initializeForm()
    this.getEmail()
    this.getName()
  }

  initializeForm(){
    this.addRealEstateForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      city: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      zipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
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

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}