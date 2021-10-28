import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient) { }

  searchWord(lat,lan){
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+lat+","+lan+".json?access_token=pk.eyJ1IjoidW1lc2gxODAiLCJhIjoiY2t2OXdzZ2ljMWVwMjMwazljOWp5NGUxMyJ9.8D6UcRdJpvGG3QbhzVceCA"
    return this.http.get(url);
  }
}
