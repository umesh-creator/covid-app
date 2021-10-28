import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { isThisQuarter } from 'date-fns';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  myChart: any = ''
  iso = ''
  records = []
  data: { x: Date, y: number }[] = []
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.iso = this.route.snapshot.params['iso'];

    this.route.params.subscribe((params: Params) => {
      this.iso = params['iso'];
      this.data = []
      this.gerChartData();
      this.drawChart();
    })

  }

  gerChartData() {
    return this.http
      .get('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/' + this.iso, {
        headers: {
          ['x-rapidapi-host']: 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
          ['x-rapidapi-key']: 'd8090352e6msh336817927c0ec02p1de27ajsn9eb8f48f4160'
        }
      }).subscribe(((data: any) => {
        this.records = data;
        this.records.forEach((obj: any, index) => {
          this.data.push(
            {
              x: obj.date,
              y: obj.total_cases
            }
          )
        });
      }));
  }

  drawChart() {

    const data = {

      datasets: [{
        label:'Click To Display Chart',
        pointRadius: 6,
        data: this.data,
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    };
    if (this.myChart) this.myChart.destroy();
    this.myChart = new Chart('myChart', {
      type: 'scatter',
      data: data,
      options: {
        plugins: {
          legend: {
            display: true,
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            },
          },
          y:{
            title:{
              display:true,
              text:'Confirmed Cases'
            }
          }
        }
      }
    });
  }
}
