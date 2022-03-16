import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegistrationRequest } from '../models/registrationRequest';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationRequest } from '../models/authenticationRequest';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { tokenGetter } from '../app.module';
import { UserManager, UserManagerSettings, User } from 'oidc-client'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl: string = `${environment.authUrl}`;

  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User | null = null;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
    this.manager.getUser().then(user => {
      this.user = user;
      this._authStatus.next(this.isAuthenticated());
    });
  }

  public login() {
    return this.manager.signinRedirect();
  }

  public async completeLogin() {
    this.user = await this.manager.signinRedirectCallback();
    this._authStatus.next(this.isAuthenticated());
  }

  public register(request: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.authUrl}/Account/Register`, request);
  }

  public async logout() {
    await this.manager.signoutRedirect();
  }

  public get authHeader(): string {
    return `${this.user?.token_type} ${this.user?.access_token}`
  }

  public get name(): string {
    return this.user?.profile.name ?? '';
  }

  public isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  } 

  public isAdmin(): boolean {
    const token = this.user?.access_token;

    if (!token)
    {
      return false;
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken["role"];

    return role === "admin";
  }

}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://localhost:7257',
    client_id: 'flags',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'openid profile flagsApi.read roles',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html',
  }
}
