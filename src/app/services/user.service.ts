import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private authService: AuthenticationService) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      headers : {
        "Authorization": this.authService.authHeader
      }   
    })
  }

  public getMyUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/my`, {
      headers : {
        "Authorization": this.authService.authHeader
      }   
    })
  }

  public getUser(email?: string): Observable<User> {
    let requestEmail = email;

    if (!requestEmail)
    {
      requestEmail = this.authService.name;
    }

    return this.http.get<User>(`${this.apiUrl}/${email}`, {
      headers : {
        "Authorization": this.authService.authHeader
      }   
    })
  }

  public addCountryToUser(email: string, code: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${email}/add/${code}`, null, {
      headers : {
        "Authorization": this.authService.authHeader
      }   
    });
  }

  public removeCountryFromUser(email: string, code: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${email}/remove/${code}`, null, {
      headers : {
        "Authorization": this.authService.authHeader
      }   
    });
  }

}
