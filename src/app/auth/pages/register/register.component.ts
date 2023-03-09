import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSerive: AuthService
  ){ }

  register(){
    //Leo los datos del formulario y los almaceno en una variable

    const data = {
      name: this.registerForm.controls['name'].value ||  '',
      email: this.registerForm.controls['email'].value ||  '',
      password: this.registerForm.controls['password'].value ||  ''
    }

    this.authSerive.registerUser(data).subscribe({
      next: res => {
        if(res === true){
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire({
            title: 'Credenciales no válidas',
            text: 'El correo con el que esta intentando acceder ya existe',
            icon: 'error'
          })
          this.registerForm.controls['email'].setValue('');
        }
      }
    })
  }

  /*

    Pasos a seguir:

    1.Guardo todos los datos del formulario después de validarlos.
    2. Mando la petición al back
    3. En caso de obtener una respuesta correcta: redireccionar al dashboard
       En caso de obtener una respuesta invalida: mostrar el error con el modal.

  */
}
