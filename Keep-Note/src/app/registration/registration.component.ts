import { Component } from '@angular/core';
import { FormBuilder,Validators, FormGroup, FormControl } from '@angular/forms';
import {mustMatchValidator} from '../Validators/password.validator'
import { MatSnackBar } from '@angular/material/snack-bar';
import { checkIfGuestEmailsAreValid } from '../Validators/email.validator';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private fb:FormBuilder, private snackbar:MatSnackBar, private service:ServiceService){}

  registration = this.fb.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required,Validators.minLength(2)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    email:['',[Validators.required,checkIfGuestEmailsAreValid]],
    gender:['',[Validators.required]],
    age:['',[Validators.required,Validators.min(18)]],
    phone:['',[Validators.required,Validators.pattern(/^[7-9]\d{9}$/)]],
    address : this.fb.group({
      street:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zipcode:['',[Validators.required,Validators.pattern(/^\d{5}$/)]]
    })
  },{validator:mustMatchValidator})

  
  get firstName() { return this.registration.get("firstName") }
  get lastName() { return this.registration.get("lastName") }
  get email() { return this.registration.get("email") }
  get password() { return this.registration.get("password") }
  get confirmPassword() { return this.registration.get("confirmPassword") }
  get age() { return this.registration.get("age") }
  get phone() { return this.registration.get("phone") }

  get city(){
    return this.registration.get('address.city');
  }

  get street(){
    return this.registration.get('address.street');
  }

  get state(){
    return this.registration.get('address.state');
  }

  get zipcode(){
    return this.registration.get('address.zipcode');
  }

  onSubmit(){
    
    this.snackbar.open('Congrats, you have submitted the form!!', 'success', {
      duration: 5000,
       panelClass: ['mat-toolbar', 'mat-primary']
     }) 
     
     this.registration.reset();
  
    }


    saveUser(){
      this.service.pushData(this.registration.value).subscribe(abc => {
        alert("New User Added");
        console.log(abc)
      })
    }

}