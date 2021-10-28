import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  getCovidData() {
    return this.http.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world', {
      headers: {
        ['x-rapidapi-host']: 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        ['x-rapidapi-key']: 'd8090352e6msh336817927c0ec02p1de27ajsn9eb8f48f4160'
      }
    });
  }
}
