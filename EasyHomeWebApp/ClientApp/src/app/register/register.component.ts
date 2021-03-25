import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    {Role: 'owner', name: "Właściciel"},
    {Role: 'rentier', name: "Najemca"}
  ]


  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date;
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      role: [this.role[1]],
      firstName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      lastName: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dateOfBirth: ['',[Validators.required]],
      state: [this.states[0]],
      zipCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      city: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      street: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      streetNo: ['',[Validators.required]],


    })
  }
  matchValues(matchTo: string): ValidatorFn{
    return(control: AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    // this.accountService.register(this.registerForm.value).subscribe(response =>{
    //   console.log(response)
    //   // this.router.navigateByUrl('#')
    // }, error =>{
    //   this.validationErrors = error;
    // })
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }
}
