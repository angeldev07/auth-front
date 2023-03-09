import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  res = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }


  canActivate(): Observable<boolean > | boolean {
    return this.auth.readTokenFromLocalStorage().pipe(
      tap(valid => {
        if(! valid )
          this.router.navigateByUrl('/auth')
      })
    )
  }

  canLoad(): Observable<boolean > |  boolean  {
    return this.auth.readTokenFromLocalStorage().pipe(
      tap(valid => {
        if(! valid )
          this.router.navigateByUrl('/auth')
      })
    )
  }

}
