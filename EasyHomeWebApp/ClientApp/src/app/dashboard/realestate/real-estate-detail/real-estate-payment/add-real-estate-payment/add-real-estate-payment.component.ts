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
  styleUrls: ['./add-real-estate-payment.component.css'],
})
export class AddRealEstatePaymentComponent implements OnInit {
  payments: FormGroup;
  realEstateId: number;
  realEstateRentier: realEstateUser[];
  validationErrors: string[] =[];
  constructor(private payment: PaymentsService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private realestateService: RealestateService, private toastr: ToastrService) {
    this.realEstateId = data.realEstateId
   }

  ngOnInit(): void {
    this.getRentiers()
    this.intializeForm();
    console.log(typeof this.realEstateId)
    console.log(this.realestateService.getRentiers(this.realEstateId))

  }
  intializeForm(){
    this.payments = this.fb.group({
    realEstateId: [this.realEstateId],
    PaymentDeadline: [  ,[Validators.required]],
    PayersId: [[], [Validators.required,]],
    Amount: [ parseInt('0'),[Validators.required]],
    Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    Description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    PaymentStatus: [1],
    ReceiverBankAccount: [1200012030200359100100]
    })
  }
  getRentiers(){
    this.realestateService.getRentiers(this.realEstateId)
    .subscribe(rentiers =>{
      console.log(rentiers)
    this.realEstateRentier = rentiers
    })
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
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};