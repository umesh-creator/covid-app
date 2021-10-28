import { Time } from "@angular/common";

export interface covid {
  cases:number;
  deaths:number;
  tested?:number;
  recovered?:number;
  pctTest?:number;
  pctPositive?:number;
  lastUpdatedTime?:string;
  activeCases?:number;
  recoveryProporation?:number;
  totCases_1M_Pop?:number
}
