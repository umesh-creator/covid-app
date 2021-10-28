import { Component, OnInit } from '@angular/core';
import { covid } from "../../models/covid.model";
import { CovidService } from './covid.service';

interface keyable {
  [key: string]: any
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  total: covid = {
    cases: 5,
    deaths: 5,
    recovered: 0,
    recoveryProporation:0,
    totCases_1M_Pop:0,
    activeCases:0
  };

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {

    this.covidService.getCovidData().subscribe((data: keyable) => {

      this.total.cases = data[0].TotalCases;
      this.total.deaths = data[0].TotalDeaths;
      this.total.recovered = data[0].TotalRecovered;
      this.total.recoveryProporation = data[0].Recovery_Proporation;
      this.total.totCases_1M_Pop = data[0].TotCases_1M_Pop;
      this.total.activeCases = data[0].ActiveCases;
    })

  }


}
