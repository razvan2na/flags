import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/country';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationRequest } from 'src/app/models/authenticationRequest';
import { tokenGetter } from 'src/app/app.module';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User | undefined;
  public countries: Country[] = [];
  public tableColumns: string[] = ["flag", "name", "code", "actions"];

  public form = new FormControl();
  public filteredCountries: Observable<Country[]> = of(this.countries);
  public countryChoice: Country = {
    code: "",
    name: "",
    flagLink: ""
  }

  public password: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private countryService: CountryService,
    private authService: AuthenticationService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUser()
    this.loadCountries()

    this.filteredCountries = this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value),)
    )
  }

  private loadUser(): void {
    const email = String(this.route.snapshot.paramMap.get('email'))

    this.userService.getUser(email)
      .subscribe(result => this.user = result);
  }

  private loadCountries(): void {
    this.countryService.getCountries()
      .subscribe(result => this.countries = result)
  }

  public addCountry(): void {
    if (this.user && this.countryChoice)
    {
      this.userService.addCountryToUser(this.user.email, this.countryChoice.code)
        .subscribe(() => this.loadUser())
    }
  }

  public removeCountry(code: string): void {
    if (this.user)
    {
      this.userService.removeCountryFromUser(this.user.email, code)
        .subscribe(() => this.loadUser())
    }
  }

  public countrySelected(option: MatOption): void {
    const choice = this.countries.find(c => c.name === option.value)

    if (choice)
    {
      this.countryChoice = choice;
    }

    console.log(this.countryChoice)
  }

  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().includes(filterValue))
  }

}
