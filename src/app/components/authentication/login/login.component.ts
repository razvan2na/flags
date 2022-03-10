import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationRequest } from 'src/app/models/authenticationRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public request: AuthenticationRequest = {
    email: '',
    password: '',
  }

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.login(this.request)
      .subscribe(result => {
        localStorage.setItem("token", result.token);
        this.authService.changeAuthState(true);
        this.router.navigate(["/home"]);
      });
  }

}
