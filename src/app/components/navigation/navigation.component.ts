import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isAuth: boolean = false;
  public isAdmin: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
    
    if (this.isAuth)
    {
      this.isAdmin = this.authService.isAdmin();
    }

    this.authService.authStatus
      .subscribe(result => {
        this.isAuth = result;
        
        if (this.isAuth)
        {
          this.isAdmin = this.authService.isAdmin();
        }
        else
        {
          this.isAdmin = false;
        }

      });
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }

}
