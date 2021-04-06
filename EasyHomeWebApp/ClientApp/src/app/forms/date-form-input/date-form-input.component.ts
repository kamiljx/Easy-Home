import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-date-form-input',
  templateUrl: './date-form-input.component.html',
  styleUrls: ['./date-form-input.component.css']
})
export class DateFormInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(@Self() public ngControl: NgControl, private translateService:TranslateService){
    this.ngControl.valueAccessor=this;
    this.bsConfig={
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY',
      isAnimated: true 
    }
  }
  ngOnInit(): void {
    this.translateService.get('user.' + this.label).subscribe((data:any)=> {
      this.label = data
      JSON.parse(JSON.stringify(this.label))
    });
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }


}
