import {
  ChangeDetectorRef, Component, EventEmitter, OnInit, AfterViewInit, Output, ViewChild,
  OnChanges, SimpleChanges
} from '@angular/core';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Router} from '@angular/router';
import {DialogContactComponent} from '../../dialog-contact/dialog-contact.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HomeService} from '../../home/home.service';
import {ToastrService} from 'ngx-toastr';
import {FormDataModel} from '../../home/home.model';
import {ResultDataService} from '../result.service';
import {Constants} from '../../app.constant';

@Component({
  selector: 'app-typical-day',
  templateUrl: './typical-day.component.html',
  styleUrls: ['./typical-day.component.scss']
})
export class TypicalDayComponent implements OnInit, AfterViewInit {
  @ViewChild('baseChart') private baseChart: any;
  // @ViewChild( BaseChartDirective ) chart: BaseChartDirective;
  data;
  checkIndependence: false;
  season = 'yearly';
  storage = 'wos';
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

  slides = [
    'Whole-year', 'Spring', 'Summer', 'Autumn', 'Winter'
  ];

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
  bsModalRef: BsModalRef;
  public model = new FormDataModel();

  leadId;

  constructor(private router: Router,
              private modalService: BsModalService,
              private homeService: HomeService,
              private toastr: ToastrService,
              private cdRef: ChangeDetectorRef,
              private resultDataService: ResultDataService,
              private appConstants: Constants) {
    this.checkIndependence = false;
    this.resultDataService.result.subscribe(res => {
      this.data = res as any;
    });

    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
  }

  ngOnInit(): void {
    this.changeSeason();
    this.log(event);

  }


  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  changeUrl() {
    this.router.navigate(['result', 'economic']);
  }

  goBack() {
    this.router.navigate(['result', 'consumption']);
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
    if (this.storage === 'wos') {
      console.log('wos');
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
      console.log('ws')
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

  createQuotation() {
    const initialState = {
      title: 'Conatct',
      confirmed: false,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(DialogContactComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose = (myData) => {
      myData.data.customercontact.lead_id = this.leadId;
      this.homeService.updateContactInformations(myData.data).subscribe(reply => {
        const response = reply as any;
        this.bsModalRef.hide();
        this.toastr.success('Quotation upload successfully');
      }, error => {
        if (error && error.error && error.error.message) {
          this.toastr.error(error.error.message);
        }
      });
    };

  }

  log(event: any) {
    if (this.storage === 'wos') {
      if (event === 0) {
        this.season = 'yearly';
        this.solarValue = Object.values(this.data ?.Output.Solar[this.season]);
        this.toNet = Object.values(this.data ?.Output.Independance[this.season]);
        this.selfComsumption = Object.values(this.data ?.Output.SelfConsumption[this.season]);
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumption;
        this.lineChartData[2].data = [];
        this.lineChartData[3].data = this.toNet;

      } else if (event === 1) {
        this.season = 'spring';
        this.solarValue = Object.values(this.data ?.Output.Solar[this.season]
      )
        ;
        this.toNet = Object.values(this.data ?.Output.Independance[this.season]
      )
        ;
        this.selfComsumption = Object.values(this.data ?.Output.SelfConsumption[this.season]
      )
        ;
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]
      )
        ;
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumption;
        this.lineChartData[2].data = [];
        this.lineChartData[3].data = this.toNet;

      } else if (event === 2) {
        this.season = 'summer';
        this.solarValue = Object.values(this.data ?.Output.Solar[this.season]
      )
        ;
        this.toNet = Object.values(this.data ?.Output.Independance[this.season]
      )
        ;
        this.selfComsumption = Object.values(this.data ?.Output.SelfConsumption[this.season]
      )
        ;
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]
      )
        ;
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumption;
        this.lineChartData[2].data = [];
        this.lineChartData[3].data = this.toNet;
      } else if (event === 3) {
        this.season = 'autumn';
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

      } else if (event === 4) {
        this.season = 'winter';
        this.solarValue = Object.values(this.data ?.Output.Solar[this.season]
      )
        ;
        this.toNet = Object.values(this.data ?.Output.Independance[this.season]
      )
        ;
        this.selfComsumption = Object.values(this.data ?.Output.SelfConsumption[this.season]
      )
        ;
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]
      )
        ;
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumption;
        this.lineChartData[2].data = [];
        this.lineChartData[3].data = this.toNet;

      }

    } else {
      if (event === 0) {
        this.season = 'yearly';
        this.solarValue = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.toNetWBatt = Object.values(this.data ?.Output.IndependanceWBatt[this.season]);
        this.selfComsumptionWBatt = Object.values(this.data ?.Output.SelfConsumptionWBatt[this.season]);
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumptionWBatt;
        this.lineChartData[2].data = this.solarToBattery;
        this.lineChartData[3].data = this.toNetWBatt;
      } else if (event === 1) {
        this.season = 'spring';
        this.solarValue = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.toNetWBatt = Object.values(this.data ?.Output.IndependanceWBatt[this.season]);
        this.selfComsumptionWBatt = Object.values(this.data ?.Output.SelfConsumptionWBatt[this.season]);
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumptionWBatt;
        this.lineChartData[2].data = this.solarToBattery;
        this.lineChartData[3].data = this.toNetWBatt;

      } else if (event === 2) {
        this.season = 'summer';

        this.solarValue = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.toNetWBatt = Object.values(this.data ?.Output.IndependanceWBatt[this.season]);
        this.selfComsumptionWBatt = Object.values(this.data ?.Output.SelfConsumptionWBatt[this.season]);
        this.solarToBattery = Object.values(this.data ?.Output.SolartoBattery[this.season]);
        this.lineChartData[0].data = this.solarValue;
        this.lineChartData[1].data = this.selfComsumptionWBatt;
        this.lineChartData[2].data = this.solarToBattery;
        this.lineChartData[3].data = this.toNetWBatt;
      } else if (event === 3) {

        this.solarValue = Object.values(this.data ?.Output.SolartoBattery[this.season]
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
      } else if (event === 4) {
        this.season = 'winter';
        this.solarValue = Object.values(this.data ?.Output.SolartoBattery[this.season]
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

}
