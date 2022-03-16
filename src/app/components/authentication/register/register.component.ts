import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegistrationRequest } from 'src/app/models/registrationRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public request: RegistrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.authService.register(this.request)
      .subscribe(() => this.router.navigate(['/login']))
  }

}
