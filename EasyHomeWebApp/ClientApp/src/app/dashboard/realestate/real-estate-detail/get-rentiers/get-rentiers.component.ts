import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { realEstateUser } from 'src/app/models/realEstateUser';
import { RealestateService } from 'src/app/services/realestate.service';

@Component({
  selector: 'app-get-rentiers',
  templateUrl: './get-rentiers.component.html',
  styleUrls: ['./get-rentiers.component.css']
})
export class GetRentiersComponent implements OnInit {
  realEstateRentier: realEstateUser[];
  @Input() realEstateId;
  constructor(private realestateService: RealestateService, private router: Router) { }

  ngOnInit(): void {
    this.getRentiers()
    console.log(this.realEstateRentier)
  }

  // toProfile(){
  //   this.router.navigate
  // }
  getRentiers(){
    this.realestateService.getRentiers(this.realEstateId)
    .subscribe(rentiers =>{
      console.log(rentiers)
    this.realEstateRentier = rentiers
    })
}
}
