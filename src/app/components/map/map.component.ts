import { StatesService } from './../states/states.service';
import { keyable } from './../../models/keyable.model';
import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { map } from "rxjs/operators";

import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { getISODay } from 'date-fns';
import { interval } from 'rxjs';

interface Istates {
  Country: string;
  ThreeLetterSymbol: string
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  place: string = 'Afghanistan'
  iso = 'afg'
  lat = 0;
  lng = 0;
  map: mapboxgl.Map;
  message = 'hello world'
  marker: mapboxgl.Marker;
  constructor(private route: ActivatedRoute, private router: Router, private mapServcice: MapService, private statesService: StatesService) { }

  ngOnInit(): void {

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 1,
      center: [0, 0]
    });
    this.onClick();
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  onClick() {
    this.map.on('click', (e) => {
      this.lat = e.lngLat.lat;
      this.lng = e.lngLat.lng;
      this.map.flyTo({
        center: [this.lat, this.lng]
      });
      this.createMarker(this.lat, this.lng);
      this.mapServcice.searchWord(this.lat, this.lng).pipe(map((res: keyable) => {
        return res.features;
      })).subscribe((data: any) => {
        if (data.length > 0) {
          this.place = data[0].place_name.split(',').pop().trim();
        }
        else {
          alert('choose differnnt coordinates');
        }
      })

      this.navigate();

    });

  }

  createMarker(lat, lng) {
    if (this.marker) this.marker.remove();
    this.marker = new mapboxgl.Marker({

    })
      .setLngLat([lat, lng])
      .addTo(this.map);

  }

  navigate() {
    this.getIso(this.place);

    console.log(this.iso,this.place);



  }

  getIso(place) {
    let iso:string;
    this.statesService.getStates().subscribe((states:Istates[]) => {
      //console.log(states);
      states.forEach(element => {
        if (element.Country === this.place.trim()) {
          this.iso=element.ThreeLetterSymbol;
          this.place=element.Country;
          this.router.navigate([this.place, this.iso]);
        }
      });
    })

  }
}

