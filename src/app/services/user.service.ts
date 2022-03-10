import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    })
  }

  public getUser(email?: string): Observable<User> {
    let requestEmail = email;

    if (!requestEmail)
    {
      const token = localStorage.getItem('token')

      if (!token)
      {
        throw new Error("There is no token!");
      }
  
      const decodedToken = this.jwtHelper.decodeToken(token)
      requestEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
    }

    return this.http.get<User>(`${this.apiUrl}/${requestEmail}`, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    })
  }

  public addCountryToUser(email: string, code: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${email}/add/${code}`, null, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    });
  }

  public removeCountryFromUser(email: string, code: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${email}/remove/${code}`, null, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    });
  }

}
