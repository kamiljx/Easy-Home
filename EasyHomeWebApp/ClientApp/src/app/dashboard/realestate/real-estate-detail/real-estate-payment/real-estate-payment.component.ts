import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddRealEstatePaymentComponent } from './add-real-estate-payment/add-real-estate-payment.component';

@Component({
  selector: 'app-real-estate-payment',
  templateUrl: './real-estate-payment.component.html',
  styleUrls: ['./real-estate-payment.component.css']
})
export class RealEstatePaymentComponent implements OnInit {
  realEstateId;
  @Input() specificRealEstate;
  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.realEstateId = +this.activatedRoute.snapshot.params['id']
    console.log(this.specificRealEstate + "1")
    console.log(typeof this.realEstateId)
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddRealEstatePaymentComponent, {
      width: '40%',
      data: {
        realEstateId: this.realEstateId,
        specificRealEstate: this.specificRealEstate
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      autoFocus: false
      
    });
  }
}
