import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  error: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    // if (this.route.snapshot.fragment.indexOf('error') >= 0) {
    //   this.error = true;
    //   console.log('hey')
    //   return;
    // }

    await this.authService.completeLogin();
    this.router.navigate(['/home']);
  }

}
