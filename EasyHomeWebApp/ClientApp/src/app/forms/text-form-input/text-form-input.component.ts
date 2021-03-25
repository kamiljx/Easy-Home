import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-form-input',
  templateUrl: './text-form-input.component.html',
  styleUrls: ['./text-form-input.component.css']
})
export class TextFormInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text'


  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }


}
