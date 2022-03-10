import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-index',
  templateUrl: './country-index.component.html',
  styleUrls: ['./country-index.component.css']
})
export class CountryIndexComponent implements OnInit {

  public countries: Country[] = [];
  public tableColumns: string[] = ['flag', 'name', 'code', 'actions'];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries()
      .subscribe(result => this.countries = result);
  }

  delete(code: string) {
    this.countryService.deleteCountry(code)
      .subscribe(() => this.loadCountries());
  }

}
