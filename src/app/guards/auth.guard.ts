import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad {

  res = false;

  constructor(
    private auth: AuthService
  ) { }
  
  canLoad(
    route: Route, 
    segments: UrlSegment[]): boolean  {
    
    return this.res;  
  }

}
