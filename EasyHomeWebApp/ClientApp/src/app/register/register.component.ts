import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] =[];
  states:any = [
    {name: 'Dolnośląskie'},
    {name: 'Kujawsko-Pomorskie'},
    {name: 'Lubelskie'},
    {name: 'Lubuskie'},
    {name: 'Łódzkie'},
    {name: 'Małopolskie'},
    {name: 'Mazowieckie'},
    {name: 'Opolskie'},
    {name: 'Podkarpackie'},
    {name: 'Podlaskie'},
    {name: 'Pomorskie'},
    {name: 'Śląskie'},
    {name: 'Świętokrzyskie'},
    {name: 'Warmińsko-Mazurskie'},
    {name: 'Wielkopolskie'},
    {name: 'Zachodniopomorskie'},
  ]
  role:any = [
    {Role: 'owner', name: "owner" },
    {Role: 'rentier', name: "rentier"}
  ]


  constructor(private accountService: AccountService, private fb: FormBuilder, 
    private router: Router, private translateService: TranslateService) {  }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date;
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      /*role: ['owner'],*/
      firstName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      lastName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
   /*   dateOfBirth: ['',[Validators.required]],*/
      state: ['Dolnośląskie',this.states[0]],
      zipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]],
      city: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      address: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(95)]],


    })
  }
  matchValues(matchTo: string): ValidatorFn{
    return(control: AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
     this.accountService.register(this.registerForm.value).subscribe(response =>{
       console.log(response)
       // this.router.navigateByUrl('#')
     }, error =>{
       this.validationErrors = error;
     })
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }
}
