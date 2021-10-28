import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered', {
      headers: {
        ['x-rapidapi-host']: 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        ['x-rapidapi-key']: 'd8090352e6msh336817927c0ec02p1de27ajsn9eb8f48f4160'
      }
    });
  }

}
