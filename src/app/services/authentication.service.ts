import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegistrationRequest } from '../models/registrationRequest';
import { Observable, Subject } from 'rxjs';
import { AuthenticationRequest } from '../models/authenticationRequest';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { tokenGetter } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = `${environment.apiUrl}/auth`;

  private authChangeSubject = new Subject<boolean>();
  public authChanged = this.authChangeSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/login`, request);
  }

  public register(request: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  public changePassword(request: AuthenticationRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/password-change`, request, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    })
  }

  public changeAuthState(isAuthenticated: boolean): void {
    this.authChangeSubject.next(isAuthenticated);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token)
    {
      return !this.jwtHelper.isTokenExpired(token)
    }

    return false;
  } 

  public isAdmin(): boolean {
    const token = localStorage.getItem('token');

    if (!token)
    {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return role === "Admin";
  }

}
