import { Component, OnInit, Input} from '@angular/core';
import { Realestate } from 'src/app/models/realestate';
import { RealestateService } from 'src/app/services/realestate.service';
import { MatTableDataSource } from '@angular/material/table';
import { ThemeService } from 'src/app/services/theme.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { AddRealEstateComponent } from './add-realestate/add-realestate.component';



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

   displayedColumns: string[] = ['id', 'name', 'city', 'zipcode', 'address', 'country'];

   dataSource = new MatTableDataSource<Realestate>(this.ELEMENT_DATA)

  
  constructor(private realestateService: RealestateService, private themeService: ThemeService, private accountService: AccountService,
    private dialog: MatDialog, ) {

  }


  ngOnInit(): void {
  this.getAllRealEstates()
    console.log(this.accountService.getCurrentUser())
    console.log(this.accountService.getCurrentToken())
    this.storedDarkTheme = this.themeService.darkThemeValue;
    this.storedTheme = this.themeService.storedTheme;
    console.log(this.dataSource)
}
openDialog() {
  const dialogRef = this.dialog.open(AddRealEstateComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    autoFocus: false
  });
}


  
   getAllRealEstates(){
       let resp = this.realestateService.getRealestate();
       resp.subscribe(realestate =>{
           this.dataSource.data=realestate as Realestate[]
         })
       }
  

       
}
