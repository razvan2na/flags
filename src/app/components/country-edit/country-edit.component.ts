import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {

  public country: Country | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.loadCountry()
  }

  loadCountry(): void {
    const code = String(this.route.snapshot.paramMap.get('code'));

    this.countryService.getCountry(code)
      .subscribe(result => this.country = result);
  }

  save(): void {
    const code = String(this.route.snapshot.paramMap.get('code'));

    if (this.country)
    {
      this.countryService.updateCountry(code, this.country)
        .subscribe(() => this.location.back())
    }
  }

}
