import { Component, OnInit, Input, Output, ViewChild, EventEmitter, } from '@angular/core';
import { Realestate } from 'src/app/models/realestate';
import { RealestateService } from 'src/app/services/realestate.service';
import { MatTableDataSource } from '@angular/material/table';
import { ThemeService } from 'src/app/services/theme.service';
import { AccountService } from 'src/app/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRealEstateComponent } from './add-realestate/add-realestate.component';
import { AssignRentierToRealestateComponent } from './assign-rentier-to-realestate/assign-rentier-to-realestate.component';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
  
})
export class RealestateComponent implements OnInit{
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Realestate[];
  isDark: string;
  storedTheme: string
  storedDarkTheme: boolean
  realestateId;

  rowItem: any;
  displayedColumns: string[] = ['id', 'name', 'city', 'zipcode', 'address', 'country', 'options'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Realestate>(this.ELEMENT_DATA)

  
  constructor(private realestateService: RealestateService, private themeService: ThemeService, private accountService: AccountService,
    private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
      
  }

  ngOnInit(): void {
  this.getAllRealEstates()
    this.storedDarkTheme = this.themeService.darkThemeValue;
    this.storedTheme = this.themeService.storedTheme;
}
openDialog() {
  const dialogRef = this.dialog.open(AddRealEstateComponent);

  dialogRef.afterClosed().subscribe(result => {
    autoFocus: false
  });
}
addRentierToRealEstate(id: number){
  this.realestateId = id;
  const dialogRef = this.dialog.open(AssignRentierToRealestateComponent, {
    data: this.realestateId
  });

  dialogRef.afterClosed().subscribe(result => {
    autoFocus: false
  });
}

getAllRealEstates(){
  let resp = this.realestateService.getRealestate();
  resp.subscribe(realestate =>{
    this.dataSource.data=realestate as Realestate[]
  })
}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
   
  toDetail(param){
    this.rowItem = param
    this.realestateService.specificRealEstate = this.rowItem
    console.log(this.rowItem)
    this.router.navigate(['details',param.id], {relativeTo: this.route},)
  }
}
