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
  constructor(private paymentService: PaymentsService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private realestateService: RealestateService, private toastr: ToastrService) {
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
  console.log(this.payments.value)
  this.paymentService.addRealEstatePayment(this.payments.value).subscribe(
    response =>{
     this.toastr.success('Dodano')
  }, error =>{
    this.validationErrors = error;
    console.log(this.validationErrors)
    this.toastr.error(error.error)
  })
}

}