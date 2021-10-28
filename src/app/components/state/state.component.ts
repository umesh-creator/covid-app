import { keyable } from './../../models/keyable.model';
import { covid } from './../../models/covid.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  classname="notactive";
  iso=''
  state = '';
  display = 0;
  total: covid = {
    cases: 5,
    deaths: 5,
    tested: 0,
    pctTest: 0,
    pctPositive: 0
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.state = this.route.snapshot.params['name'];
    this.iso=this.route.snapshot.params['iso'];

    this.route.params.subscribe((params: Params) => {
      this.state = params['name'];
      this.iso = params['iso'];
      this.getStateData(this.state,this.iso);
    })
  }



  getStateData(state,iso) {
    return this.http.get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/'+state+'/'+iso, {
      headers: {
        ['x-rapidapi-host']: 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
        ['x-rapidapi-key']: 'd8090352e6msh336817927c0ec02p1de27ajsn9eb8f48f4160'
      }
    })
      .pipe(map((data: keyable) => {
        return data[0];
      }))
      .subscribe((res: keyable) => {
        console.log(res);
        this.total.cases = res.TotalCases
        this.total.deaths = res.TotalDeaths
        this.total.pctPositive = parseFloat(((res.TotalCases / res.TotalTests)*100).toFixed(2)) ;
        this.total.pctTest = res.Test_Percentage
        this.total.tested = res.TotalTests
      });
  }




}
