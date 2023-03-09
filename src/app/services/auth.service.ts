import { HttpClient, HttpHeaders } from '@angular/common/http';
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
                      this.saveToken(res.token!)
                      this._user = {
                        _uid: res.uid!,
                        name: res.nombre!
                      }
                    }
                  }),
                  map( res => res.ok),
                  catchError(err => of(err.error))
               );
  }

  readTokenFromLocalStorage(){
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(environment.validateTokenUrl, {headers})
               .pipe(
                map( response => {
                  this.saveToken(response.token!)
                      this._user = {
                        _uid: response.uid!,
                        name: response.nombre!
                      }
                  return response.ok
                }),
                catchError(err => of(false)
                ))

  }

  logOut(){
    localStorage.removeItem('token')
  }

  private saveToken(token: string){
    localStorage.setItem('token', token);
  }
}
