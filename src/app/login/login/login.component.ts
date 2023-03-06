import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  longinForm = this.fb.group({
    
  })

  constructor(
    private fb : FormBuilder
   ) { }

}
