import { Self } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-material-text-form-input',
  templateUrl: './material-text-form-input.component.html',
  styleUrls: ['./material-text-form-input.component.css']
})
export class MaterialTextFormInputComponent implements ControlValueAccessor, OnInit {

  @Input() label: string;
  @Input() type = 'text'
  @Input() placeholder: string
  @Input() icon: string
  @Input() hint: string
  @Input() validate: any
  @Input() translatedFrom : object

  constructor(@Self() public ngControl: NgControl, private translateService: TranslateService) {
    this.ngControl.valueAccessor = this;
  }
  ngOnInit(): void {
    this.translateService.get(this.translatedFrom + '.'+ this.label).subscribe((data:any)=> {
      this.label = data
      JSON.parse(JSON.stringify(this.label))
     });
    this.translateService.get(this.hint + '.required').subscribe((data:any)=> {
      this.hint = data
      JSON.parse(JSON.stringify(this.hint))
     });
  }



  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }

  matcher = new MyErrorStateMatcher()

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}