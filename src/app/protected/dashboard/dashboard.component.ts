import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  get User () {
    return {...this.authService.User};
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('/auth/login');
  }
}
