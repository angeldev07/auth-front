import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../environments/environment.develop';
import { AuthResponse } from '../interfaces/auth.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user:User = {} as User;
  loginBaseUrl = environment.getUserUrl;

  constructor(
    private http: HttpClient
  ) { }

  get User() {
    return {...this._user};
  }

  public loginUser(email: string, password: string){
    const body = {
      email,
      password
    }
    return this.http.post<AuthResponse>(this.loginBaseUrl, body)
               .pipe(
                  tap(res => {
                    if(res.ok){
                      this._user = {
                        _uid: res.uid!,
                        name: res.name!
                      }
                    }
                  }),
                  map( res => res.ok),
                  catchError(err => of(err.error))
               );
  }
}
