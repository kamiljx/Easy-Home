import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { realEstateUser } from 'src/app/models/realEstateUser';
import { PaymentsService } from 'src/app/services/payments.service';
import { RealestateService } from 'src/app/services/realestate.service';

@Component({
  selector: 'app-add-real-estate-payment',
  templateUrl: './add-real-estate-payment.component.html',
  styleUrls: ['./add-real-estate-payment.component.css']
})
export class AddRealEstatePaymentComponent implements OnInit {
  payments: FormGroup;
  maxDate: Date;
  realEstateId: number;
  realEstateRentier: realEstateUser[];
  validationErrors: string[] =[];
  constructor(private payment: PaymentsService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private realestateService: RealestateService, private toastr: ToastrService) {
    this.realEstateId = this.data
   }

  ngOnInit(): void {
    this.getRentiers()
    this.intializeForm();
    console.log(this.realEstateRentier)
    console.log(this.realestateService.getRentiers(this.realEstateId))

  }
  
  intializeForm(){
    this.payments = this.fb.group({
    realEstateId: [this.realEstateId],
    PayersId: ['', [Validators.required]],
    Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    Description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    CreatedAt: [this.getLocalTime()],
    PaymentDeadline: ['', [Validators.required]],
    PaymentStatus: [1]
    })
  }
  getRentiers(){
    this.realestateService.getRentiers(this.realEstateId)
    .subscribe(rentiers =>{
      console.log(rentiers)
    this.realEstateRentier = rentiers
    })
}
getLocalTime(){
  return new Date()
}
addPayment(){
  this.payment.addRealEstatePayment(this.payments.value).subscribe(
    respone =>{
      this.toastr.success('dodano')
    },error =>{
      this.validationErrors = error
      this.toastr.error(error.error)
    }
  )
}


}
