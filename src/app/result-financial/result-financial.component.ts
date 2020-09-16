import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Color, Label} from "ng2-charts";
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import {ResultDataService} from "../result/result.service";
import {TranslateService} from "@ngx-translate/core";
import {black} from "color-name";

@Component({
  selector: 'app-result-financial',
  templateUrl: './result-financial.component.html',
  styleUrls: ['./result-financial.component.scss']
})
export class ResultFinancialComponent implements OnInit {
  @ViewChild('container') container : ElementRef;
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartOptions: (ChartOptions) = {
    responsive: false,
    maintainAspectRatio: false,

  };
  public barChartDataLeft: ChartDataSets[] = [
    // {data: [4887], label: 'Investment including VAT and subside', maxBarThickness: 35},
    // {data: [2544], label: 'Income over 25 years deducted operating cost', maxBarThickness: 35}
  ];
  public barChartDataCenter: ChartDataSets[] = [
    // {data: [1254], label: 'Electricity bill before solar system     ', maxBarThickness: 35},
    // {data: [5897], label: 'Electrcity bill after solar system', maxBarThickness: 35}
  ];
  public barChartDataRight: ChartDataSets[] = [
    // {data: [4587], label: 'Bank interest rate                             ', maxBarThickness: 35},
    // {data: [5897], label: 'Solar IRR                       ', maxBarThickness: 35}
  ];


  public barChartColors: Color[] = [
    {backgroundColor: 'yellow'},
    {backgroundColor: 'green'}
  ];

  public IRROptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    legend: {
      position: 'bottom', align: 'start',  labels: {boxWidth: 17, fontColor: '#151515', fontSize: 9, fontFamily: 'poppins'}, display: true
    },
    scales: {
      xAxes: [{
        // barThickness: 35,
        // maxBarThickness: 35,
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'gray',
            min: 0,
            // max: 60000,
            stepSize: 3,
            mirror: true,
          },
          scaleLabel: {
            display: true,
            labelString: '%'
          }
        },
      ]
    },
  }
  public options: any = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    legend: {
      position: 'bottom', align: 'start', maxWidth: 400, labels: {boxWidth: 17, fontColor: '#151515', fontSize: 9, fontFamily: 'poppins'}, display: true
    },
    scales: {
      xAxes: [{
        // barThickness: 35,
        // maxBarThickness: 35,
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'gray',
            min: 0,
            // max: 60000,
            stepSize: 20000,
            mirror: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'CHF'
          }
        },
      ]
    },
  }
  season;
  storage = 'PV-without-storage';
  data;
  KWAC;
  leadId;
  battkWh;
  totEnergy;
  investment;
  payback;
  NetSavings25Year;
  NetSavingsMonth;
  bankRate ;
  solarRate;
  totalElecBill = [];
  solarElecBill = [];
  saving;
  netSavingYear;
  public dynHeight

  constructor(private  resultDataService: ResultDataService,
              private translate: TranslateService,) {
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
      console.log(this.data, 'data')
    });
  }

  ngOnInit(): void {
    this.changeSeason();
  }

  changeSeason() {
    if (this.storage === 'PV-without-storage') {
      this.investment = Math.round(this.data.Output.Financial.PVNoStorage.Investment);
      this.payback = Math.round(this.data.Output.Financial.PVNoStorage.PaybackTime);
      this.NetSavings25Year = Math.round(this.data.Output.Financial.PVNoStorage.NetSavings25Years);
      this.NetSavingsMonth = Math.round(this.data.Output.Financial.PVNoStorage.NetSavingsMonth);
      this.bankRate = (this.data.Output.Financial.PVNoStorage.BankRate) * 100 ;
      this.solarRate = (this.data.Output.Financial.PVNoStorage.Project_IRR) * 100 ;
      this.totalElecBill = this.data.Output.Financial.PVNoStorage.TotalElecBill;
      this.solarElecBill = this.data.Output.Financial.PVNoStorage.SolarEBill;
      // this.saving = this.data.Output.Financial.PVNoStorage.Savings;
      // this.netSavingYear = this.data.Output.Financial.PVNoStorage.NetSavingsYear;
      this.barChartDataRight =  [{data: [this.bankRate],  maxBarThickness: 35,},
        {data: [this.solarRate],  maxBarThickness: 35,}];
      this.barChartDataCenter = [{data: [this.totalElecBill],  maxBarThickness: 35,},
        {data: [this.solarElecBill],  maxBarThickness: 35,}];
      this.barChartDataLeft = [{data: [this.investment],  maxBarThickness: 35,},
        {data: [this.NetSavings25Year],  maxBarThickness: 35,}]


    } else if (this.storage === 'PV-with-storage') {
      this.investment = Math.round(this.data.Output.Financial.PVStorage.Investment);
      this.payback = Math.round(this.data.Output.Financial.PVStorage.PaybackTime);
      this.NetSavings25Year = Math.round(this.data.Output.Financial.PVStorage.NetSavings25Years);
      this.NetSavingsMonth = Math.round(this.data.Output.Financial.PVStorage.NetSavingsMonth);
      this.bankRate = (this.data.Output.Financial.PVStorage.BankRate) * 100 ;
      this.solarRate = (this.data.Output.Financial.PVStorage.Project_IRR) * 100 ;
      this.totalElecBill = this.data.Output.Financial.PVStorage.TotalElecBill;
      this.solarElecBill = this.data.Output.Financial.PVStorage.SolarEBill;
      // this.saving = this.data.Output.Financial.PVStorage.Savings;
      // this.netSavingYear = this.data.Output.Financial.PVStorage.NetSavingsYear;

      this.barChartDataRight =  [{data: [this.bankRate] ,  maxBarThickness: 35,},
        {data: [this.solarRate] ,  maxBarThickness: 35,}];
      this.barChartDataCenter = [{data: [this.totalElecBill],  maxBarThickness: 35,},
        {data: [this.solarElecBill],  maxBarThickness: 35,}];
      this.barChartDataLeft = [{data: [this.investment],  maxBarThickness: 35,},
        {data: [this.NetSavings25Year],  maxBarThickness: 35,}];

    }
  }
}
