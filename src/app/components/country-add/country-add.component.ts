import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  public country: Country = {
    code: '',
    name: '',
    flagLink: 'https://flagcdn.com/w20/ro.png'
  };

  constructor(private countryService: CountryService, private location: Location) { }

  ngOnInit(): void {
  }

  save(): void {
    this.countryService.addCountry(this.country)
      .subscribe(() => this.location.back())
  }

}
