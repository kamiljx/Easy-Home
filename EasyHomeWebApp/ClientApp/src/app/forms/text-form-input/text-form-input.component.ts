import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-text-form-input',
  templateUrl: './text-form-input.component.html',
  styleUrls: ['./text-form-input.component.css']
})
export class TextFormInputComponent implements ControlValueAccessor,OnInit {
  @Input() label: string;
  @Input() type = 'text'
  @Input() translatedFrom : string

  constructor(@Self() public ngControl: NgControl, private translateService: TranslateService) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
    this.translateService.get(this.translatedFrom + '.'+ this.label).subscribe((data:any)=> {
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
