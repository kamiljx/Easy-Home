import { Component, OnInit } from '@angular/core';
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
  constructor(private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.realEstateId = this.route.snapshot.params['id']
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddRealEstatePaymentComponent, {
      width: '40%',
      data: this.realEstateId
    });
  
    dialogRef.afterClosed().subscribe(result => {
      autoFocus: false
      
    });
  }
}
