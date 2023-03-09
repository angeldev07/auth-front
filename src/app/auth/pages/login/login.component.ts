import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

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
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService
  ) {}

  login() {

    const body = {
      email: this.logInForm.controls['email']?.value,
      password: this.logInForm.controls['password']?.value
    }

    this.userService.loginUser(body.email, body.password)
        .subscribe({
          next: ok => {
            console.log(ok)
            if(ok === true)
              this.router.navigateByUrl('/dashboard')

            else
              Swal.fire({
                title: 'Credenciales no válidas',
                text: 'El correo con el que esta intentando acceder no existe',
                icon: 'error'
              })
          }
        })

  }

}
