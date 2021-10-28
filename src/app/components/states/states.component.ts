import { StatesService } from './states.service';
import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  states:{Country:string,ThreeLetterSymbol:string} []= [];

  constructor(private statesService:StatesService) { }

  ngOnInit() {
    this.statesService.getStates().subscribe((states:any)=>{
      this.states=states;
    })
  }

}
