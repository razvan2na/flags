import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public countries: Country[] = [];
  public tableColumns: string[] = ['flag', 'name', 'code'];

  constructor(private userService: UserService, private countryService: CountryService) { }

  ngOnInit(): void { 
    this.loadCountries();
  }

  private loadCountries(): void {
    this.userService.getUser()
      .subscribe(result => this.countries = result.countries);
  }

}
