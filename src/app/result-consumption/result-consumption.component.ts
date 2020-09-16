import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResultDataService} from "../result/result.service";
import {TranslateService} from "@ngx-translate/core";
interface Item {
  text: string;
  value: string;
}
@Component({
  selector: 'app-result-consumption',
  templateUrl: './result-consumption.component.html',
  styleUrls: ['./result-consumption.component.scss']
})
export class ResultConsumptionComponent implements OnInit {
  @Output() stepChanges: EventEmitter<any> = new EventEmitter<any>();
  storage = 'PV-without-storage';
  data;

  seasonValue;
  directUse;
  leadId;
  toNet;
  elementClicked;
  toNetWBatt;
  KWAC;
  battkWh;
  totEnergy;
  battery;
  public listItems: Array<Item> = [
    {text: this.translate.instant('season.whole-year'), value: 'year'},
    {text: this.translate.instant('season.spring'), value: 'spring'},
    {text: this.translate.instant('season.summer'), value: 'summer'},
    {text: this.translate.instant('season.autumn'), value: 'autumn'},
    {text: this.translate.instant('season.winter'), value: 'winter'}
  ];

  public  season = 'year';
  constructor(private  resultDataService: ResultDataService,
              private translate: TranslateService) {
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });
  }

  ngOnInit(): void {
    this.changeSeason();

  }
  public next(): void {
    this.stepChanges.emit({
    });
  }

  changeSeason() {
    if (this.storage === 'PV-without-storage') {
      console.log(this.season, 'season')
      this.seasonValue = Math.round(this.data.Output.totalenergy.Solar[this.season]);
      this.directUse = Math.round(this.data.Output.totalenergy.DirectUse[this.season]);
      this.toNet = Math.round(this.data.Output.totalenergy.ToNet[this.season]);
      this.battery = 0;
      this.battkWh = 0
      this.KWAC = Math.round(this.data.Output.kWAC);
      this.totEnergy = Math.round(this.data.Output.TotEnergy / 1000);

    } else {
      this.seasonValue = Math.round(this.data.Output.totalenergy.Solar[this.season]);
      this.toNet = Math.round(this.data.Output.totalenergy.ToNetWBatt[this.season]);
      this.battery = Math.round(this.data.Output.totalenergy.SolartoBattery[this.season]);
      this.directUse = Math.round(this.data.Output.totalenergy.BatterytoUse[this.season]) + Math.round(this.data.Output.totalenergy.DirectUse[this.season]);
      this.battkWh = Math.round(this.data.Output.BattkWh);
      this.KWAC = Math.round(this.data.Output.kWAC);
      this.totEnergy = Math.round(this.data.Output.TotEnergy / 1000);

    }
  }



}
