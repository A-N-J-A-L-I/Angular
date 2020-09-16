import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ResultDataService} from "../result/result.service";
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions} from 'chart.js';
import {TranslateService} from "@ngx-translate/core";

interface Item {
  text: string;
  value: string;
}

@Component({
  selector: 'app-result-typical-day',
  templateUrl: './result-typical-day.component.html',
  styleUrls: ['./result-typical-day.component.scss']
})
export class ResultTypicalDayComponent implements OnInit {
  @Output() stepChanges: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('baseChart') private baseChart: any;
  storage = 'PV-without-storage';
  data;
  checkIndependence: false;
  private toNetWBatt = [];
  private selfComsumption = [];
  private selfComsumptionWBatt = [];
  private solarToBattery = [];
  public solarValue = [];
  private toNet = [];

  showProduction = true;
  showConsumption = true;
  showBattery = true;
  showIndependence = true;
  disableBattery = false;
  public lineChartData: ChartDataSets[] = [
    {data: []},
    {data: []},
    {data: []},
    {data: [], yAxisID: 'y-axis-1'}
  ];

  public lineChartLabels: Label[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Hours'
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'gray',
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: 'Kwh'
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          ticks: {
            fontColor: 'gray',
            min: 0,
            max: 100,
          },
          scaleLabel: {
            display: true,
            labelString: '%'
          },
          gridLines: {
            display: false
          }
        }
      ]
    },
  };

  public lineChartColors: Color[] = [
    {borderColor: 'yellow'},
    {borderColor: 'green'},
    {borderColor: 'blue'},
    {borderColor: 'gray'}
  ];

  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public listItems: Array<Item> = [
    {text: this.translate.instant('season.whole-year'), value: 'yearly'},
    {text: this.translate.instant('season.spring'), value: 'spring'},
    {text: this.translate.instant('season.summer'), value: 'summer'},
    {text: this.translate.instant('season.autumn'), value: 'autumn'},
    {text: this.translate.instant('season.winter'), value: 'winter'}
  ];

  public season = 'yearly';

  constructor(private  resultDataService: ResultDataService,
              private translate: TranslateService) {
    this.checkIndependence = false;
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });
  }

  ngOnInit(): void {
    this.changeSeason()
  }

  public next(): void {
    this.stepChanges.emit({});
  }

  toggleDataSeries(type) {
    let index = -1;
    let isHidden = false;

    if (type === 'production') {
      index = 0;
      isHidden = !this.showProduction;
    } else if (type === 'consumption') {
      index = 1;
      isHidden = !this.showConsumption;
    } else if (type === 'battery') {
      index = 2;
      isHidden = !this.showBattery;

    } else if (type === 'independence') {
      index = 3;
      isHidden = !this.showIndependence;
    }

    if (index >= 0 && this.baseChart && this.baseChart.chart && this.baseChart.chart.data && this.baseChart.chart.data.datasets && this.baseChart.chart.data.datasets[index]) {
      this.baseChart.chart.data.datasets[index].hidden = !isHidden;
      this.baseChart.update();
    }
  }

  changeSeason() {
    if (this.storage === 'PV-without-storage') {
      console.log(this.season, 'season')
      this.disableBattery = true;
      this.solarValue = Object.values(this.data ?.Output.Solar[this.season]
    )
      ;
      this.toNet = Object.values(this.data ?.Output.Independance[this.season]
    )
      ;
      this.selfComsumption = Object.values(this.data ?.Output.SelfConsumption[this.season]
    )
      ;
      this.lineChartData[0].data = this.solarValue;
      this.lineChartData[1].data = this.selfComsumption;
      this.lineChartData[2].data = [];
      this.lineChartData[3].data = this.toNet;


    } else {
      this.disableBattery = false;
      this.solarValue = Object.values(this.data ?.Output.Solar[this.season]
    )
      ;
      this.toNetWBatt = Object.values(this.data ?.Output.IndependanceWBatt[this.season]
    )
      ;
      this.selfComsumptionWBatt = Object.values(this.data ?.Output.SelfConsumptionWBatt[this.season]
    )
      ;
      this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]
    )
      ;
      this.lineChartData[0].data = this.solarValue;
      this.lineChartData[1].data = this.selfComsumptionWBatt;
      this.lineChartData[2].data = this.solarToBattery;
      this.lineChartData[3].data = this.toNetWBatt;
    }
  }


}
