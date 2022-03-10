import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = `${environment.apiUrl}/countries`;

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    });
  }
  
  public getCountry(code: string): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${code}`, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    })
  }

  public addCountry(country: Country): Observable<any> {
    return this.http.post(this.apiUrl, country, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    });
  }

  public updateCountry(code: string, country: Country): Observable<any> {
    return this.http.put(`${this.apiUrl}/${code}`, country, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    });
  }

  public deleteCountry(code: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${code}`, {
      headers : {
          "Authorization": 'Bearer ' + tokenGetter()
      }   
    });
  }
  
}
