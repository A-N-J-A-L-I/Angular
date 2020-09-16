import {Component, OnInit, OnChanges, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Router} from "@angular/router";
import {DialogContactComponent} from "../../dialog-contact/dialog-contact.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormDataModel} from "../../home/home.model";
import {HomeService} from "../../home/home.service";
import {ToastrService} from "ngx-toastr";
import {ResultDataService} from "../result.service";
import {Constants} from "../../app.constant";

@Component({
  selector: 'app-economic',
  templateUrl: './economic.component.html',
  styleUrls: ['./economic.component.scss']
})
export class EconomicComponent implements OnInit , AfterViewInit{
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  // };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: { responsive: boolean } = {
    responsive: true,
  };


  public barChartData: ChartDataSets[] = [
    { data: [45, 20], label: 'Investment including VAT and a one-off payment of CHF 3,431' },
    { data: [28, 48], label: 'Income over 25 years less operating cost' }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: 'yellow' },
    { backgroundColor: 'green' }
  ]
season;
  storage = 'PV-without-storage';
  data
  KWAC;
  leadId;
  battkWh;
  totEnergy;
  bsModalRef: BsModalRef;
  public model = new FormDataModel();
  constructor(private router: Router,
              private modalService: BsModalService,
              private homeService: HomeService,
              private  toastr: ToastrService,
              private appConstants: Constants,
              private  resultDataService: ResultDataService,
              private  cdRef: ChangeDetectorRef) {
    this.resultDataService.result.subscribe(res => {
    this.data = res as any;
  });
    this.appConstants.leadId.subscribe(value => {
      this.leadId = value as string;
    });
  }

  ngOnInit(): void {
this.changeStorage();
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }
  // ngOnChanges() {
  //   if (this.battkWh && this.battkWh != '') {
  //     this.changeStorage()
  //   }
  // }
  changeUrl() {
    this.router.navigate(['result', 'sustain']);
  }
  goBack() {
    this.router.navigate(['result', 'typicalday']);
  }

  changeStorage() {
    if (this.storage === 'PV-without-storage') {
      this.battkWh = 0
      this.KWAC = Math.round(this.data?.Output.kWAC);
      console.log(this.KWAC, 'aa')
      this.totEnergy = Math.round(this.data?.Output.TotEnergy);

    } else {
      this.battkWh = Math.round(this.data?.Output.BattkWh);
      this.KWAC = Math.round(this.data?.Output.kWAC);
      this.totEnergy = Math.round(this.data?.Output.TotEnergy);

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
      console.log(myData.data)
      myData.data.customercontact.lead_id  = this.leadId;
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

}
