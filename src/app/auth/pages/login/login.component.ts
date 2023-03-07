import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  logInForm: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor ( 
    private fb: FormBuilder
  ) {}

  login(){
    console.log(this.logInForm.value);
    
  }
  
}
